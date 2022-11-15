import { Form } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";

import { keys } from "../../constants/keys";
import { apiAddNewUser, apiUpdateUser } from "../../services/user";
import { Drawer, Input, Select, notification } from "./../../components";
import { useAntForm } from "./../../hooks";

export const CaiDatNguoiDung = forwardRef(({ onSuccess = () => {} }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const { form, submitForm } = useAntForm();
  const speciality = Form.useWatch(["Speciality"], form);
  const [initData, setInitData] = useState();
  const [loading, setLoading] = useState(false);

  const isCreateNew = !initData;

  useImperativeHandle(ref, () => ({
    open: handleOpen,
    close: handleClose,
  }));

  const handleOpen = (record) => {
    setIsOpen(true);

    console.log(record);

    if (!!record) {
      setInitData(record);

      form.setFields(
        Object.keys(record).map((name) => ({
          name,
          value: record[name],
        })),
      );
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    form.resetFields();
    setInitData();
    setLoading(false);
  };

  const handleSubmit = async () => {
    try {
      const values = await submitForm();

      setLoading(true);

      if (isCreateNew) {
        await apiAddNewUser({ data: [values] });
      } else {
        await apiUpdateUser({ ...values, ID: initData.ID });
      }

      notification.success();
      handleClose();
      onSuccess();
    } catch (error) {
      error.message !== keys.ANT_FORM_ERROR && notification.error();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      open={isOpen}
      header={{ title: "User settings" }}
      onClose={handleClose}
      footer={{ visible: true, onOk: handleSubmit, loading: loading }}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Username" name="UserName" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        {isCreateNew && (
          <Form.Item label="Password" name="Password">
            <Input.Password />
          </Form.Item>
        )}

        <Form.Item label="Name" name="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Email" name="Email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Phone" name="Phone" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Role" name="Role" rules={[{ required: true }]}>
          <Select dataSource={["Doctor", "Receptionist", "Cashier"]} />
        </Form.Item>

        <Form.Item label="Department" name="Speciality" rules={[{ required: true }]}>
          <Select
            dataSource={[
              { Id: "Emergency", Name: "Emergency" },
              { Id: "Internal Medicine", Name: "Internal Medicine" },
              { Id: "Otolaryngology", Name: "Otolaryngology" },
              { Id: "Dermatology", Name: "Dermatology" },
            ]}
            labelKey="Name"
            valueKey="Id"
          />
        </Form.Item>

        <Form.Item label="Room" name="Room_ID" rules={[{ required: true }]}>
          <Select
            disabled={!speciality}
            dataSource={[
              { Id: "Room 101", Name: "Room 101" },
              { Id: "Room 102", Name: "Room 102" },
              { Id: "Room 201", Name: "Room 201" },
              { Id: "Room 202", Name: "Room 202" },
              { Id: "Room 301", Name: "Room 301" },
              { Id: "Room 302", Name: "Room 302" },
              { Id: "Room 401", Name: "Room 401" },
              { Id: "Room 402", Name: "Room 402" },
            ]}
            labelKey="Name"
            valueKey="Id"
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
});
