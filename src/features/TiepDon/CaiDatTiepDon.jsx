import { nanoid } from "@reduxjs/toolkit";
import { Col, DatePicker, Dropdown, Form, Row } from "antd";
import moment from "moment";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

import { apiAddNewAppointment } from "../../services/appointment";
import { apiAddNewExam } from "../../services/exam";
import { Drawer, Input, Search, Select, Table, notification } from "./../../components";
import { useAntForm } from "./../../hooks";
import { apiAddNewPatient, apiGetAllPatients, apiUpdatePatient } from "./../../services/patient";

export const CaiDatTiepDon = forwardRef(({ onSuccess = () => {} }, ref) => {
  const searchPatientRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const { form, submitForm } = useAntForm();
  const [patientList, setPatientList] = useState([]);
  const [initData, setInitData] = useState();
  const [loading, setLoading] = useState(false);
  const [openDropdownPatient, setOpenDropdownPatient] = useState(false);
  const [loadingPatient, setLoadingPatient] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState();

  useImperativeHandle(ref, () => ({
    open: handleOpen,
    close: handleClose,
  }));

  const handleOpen = (record) => {
    setIsOpen(true);

    if (!!record) {
      setInitData(record);
      onSelectPatient(record, true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    form.resetFields();
    setInitData();
    setSelectedPatient();
  };

  const getPatientList = async (search_string = "") => {
    try {
      setLoadingPatient(true);

      const req = { search_string };
      const res = await apiGetAllPatients(req);

      setPatientList(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingPatient(false);
    }
  };

  const onSubmit = async () => {
    try {
      setLoading(true);

      let values = await submitForm();

      let patientInfo = { ...values };
      delete patientInfo.Services;

      if (!selectedPatient) {
        patientInfo.Code = values.Phone;
        const patientRes = await apiAddNewPatient({ data: [patientInfo] });

        patientInfo.Patient_ID = patientRes["0"].ID;
      } else {
        await apiUpdatePatient({ patientInfo, ID: selectedPatient.ID });

        patientInfo.Patient_ID = selectedPatient.ID;
      }

      const res = await apiAddNewAppointment({
        Patient_ID: patientInfo.Patient_ID,
        Services: values.Services,
      });

      await apiAddNewExam({
        Patient_ID: res.Patient_ID,
        Welcome_ID: res.ID,
      });

      notification.success();
      onSuccess();
      handleClose();
    } catch (error) {
      console.log(error);

      notification.error();
    } finally {
      setLoading(false);
    }
  };

  const onSelectPatient = (record, readOnly = false) => {
    console.log(record);

    setSelectedPatient(record);

    form.setFields(
      Object.keys(record).map((name) => {
        if (name === "DoB") {
          return {
            name,
            value: !readOnly
              ? moment(record[name])
              : moment(record[name].slice(0, 11), "YYYY-MM-DD").format("DD/MM/YYYY"),
          };
        }

        return {
          name,
          value: record[name],
        };
      }),
    );

    setOpenDropdownPatient(false);
  };

  return (
    <Drawer
      open={isOpen}
      header={{
        title: "APPOINTMENT FORM",
        actions: !initData && (
          <Dropdown
            trigger="focus"
            overlay={
              <Table columns={columns} dataSource={patientList} onClickRow={onSelectPatient} loading={loadingPatient} />
            }
            onOpenChange={(bool) => {
              if (bool) getPatientList();
              else searchPatientRef.current?.setSearchValue();
              setOpenDropdownPatient(bool);
            }}
            open={openDropdownPatient}
          >
            <Search ref={searchPatientRef} placeholder="Patient name" onSearch={getPatientList} />
          </Dropdown>
        ),
      }}
      onClose={handleClose}
      footer={{ visible: !initData, onOk: onSubmit, loading: loading }}
      width="70vw"
    >
      <Form form={form} layout="vertical">
        {!!initData && (
          <Row>
            <Col span={6}>
              <Form.Item label="Appointment Code" name="ID">
                <Input readOnly />
              </Form.Item>
            </Col>
          </Row>
        )}

        <Row gutter={10}>
          <Col span={6}>
            <Form.Item label="Patient Code" name="Code">
              <Input readOnly />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="Name" name="Name" rules={[{ required: true }]}>
              <Input readOnly={!!initData} />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="Gender" name="Sex" rules={[{ required: true }]}>
              {!!initData ? <Input readOnly /> : <Select dataSource={["Male", "Female", "Other"]} />}
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="DOB" name="DoB" rules={[{ required: true }]}>
              {!!initData ? <Input readOnly /> : <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />}
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label="Email"
              name="Email"
              rules={[{ required: true }, { pattern: /\S+@\S+\.\S+/, message: "Email invalid" }]}
            >
              <Input readOnly={!!initData} />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="Phone" name="Phone" rules={[{ required: true }]}>
              <Input readOnly={!!initData} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Address" name="Address" rules={[{ required: true }]}>
              <Input readOnly={!!initData} />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="Nationality" name="Nationality" rules={[{ required: true }]}>
              <Input readOnly={!!initData} />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="Occupation" name="Occupation" rules={[{ required: true }]}>
              <Input readOnly={!!initData} />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="Symptom Description" name="Symptom" rules={[{ required: true }]}>
              <Input readOnly={!!initData} />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="Service" name="Services" rules={[{ required: true }]}>
              {!!initData ? (
                <Input readOnly />
              ) : (
                <Select
                  dataSource={[
                    { Id: "Emergency", Name: "Emergency" },
                    { Id: "Internal Examination", Name: "Internal Examination" },
                    { Id: "Eye Exam", Name: "Eye Exam" },
                    { Id: "Dermatology", Name: "Dermatology" },
                    { Id: "ENT Exam", Name: "ENT Exam" },
                    { Id: "Minor Surgery", Name: "Minor Surgery" },
                    { Id: "Vaccination", Name: "Vaccination" },
                  ]}
                  labelKey="Name"
                  valueKey="Id"
                />
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
});

const columns = [
  {
    title: "Patient code",
    dataIndex: "Code",
    width: 100,
  },
  {
    title: "Name",
    dataIndex: "Name",
    width: 200,
  },
  {
    title: "Gender",
    dataIndex: "Sex",
    width: 100,
  },
  {
    title: "Phone",
    dataIndex: "Phone",
    width: 200,
  },
];
