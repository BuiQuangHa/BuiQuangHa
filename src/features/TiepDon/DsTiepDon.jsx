import moment from "moment";
import { useEffect, useRef, useState } from "react";

import { apiGetAllAppointments, apiUpdateAppointment } from "../../services/appointment";
import { Table, TableActions, TopbarActions } from "./../../components";
import { CaiDatTiepDon } from "./CaiDatTiepDon";

export const DsTiepDon = () => {
  const searchRef = useRef();
  const configRef = useRef();
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllAppointment();
  }, []);

  const handleClickAddNew = () => configRef.current?.open();

  const handleClickEdit = (record) => configRef.current?.open(record);

  const getAllAppointment = async (search_string = searchRef.current?.searchValue) => {
    try {
      setLoading(true);

      const res = await apiGetAllAppointments({ search_string });

      setDataSource(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (record) => {
    try {
      const req = {
        ID: record.Welcome_ID,
        IsActive: false,
      };

      await apiUpdateAppointment(req);

      getAllAppointment();
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div>
      <Table
        header={{
          showHeader: true,
          title: "Appointment List",
          actions: (
            <TopbarActions
              onClickAddNew={handleClickAddNew}
              showSelect={false}
              showDelete={false}
              onSearch={getAllAppointment}
              searchRef={searchRef}
            />
          ),
        }}
        columns={[
          ...columns,
          {
            title: "Actions",
            width: "0px",
            render: (_, record) => (
              <TableActions record={record} visibleEdit={false} onDeleteRecords={handleCancelAppointment} />
            ),
          },
        ]}
        dataSource={dataSource}
        loading={loading}
        rowKey="Welcome_ID"
        onClickRow={handleClickEdit}
      />

      <CaiDatTiepDon ref={configRef} onSuccess={getAllAppointment} />
    </div>
  );
};

const columns = [
  {
    title: "APM Code",
    dataIndex: "Welcome_ID",
  },
  {
    title: "Name",
    dataIndex: "Name",
  },
  {
    title: "Patient Code",
    dataIndex: "Code",
  },
  {
    title: "Phone",
    dataIndex: "Phone",
  },
  {
    title: "Email",
    dataIndex: "Email",
  },

  {
    title: "Symptom Description",
    dataIndex: "Symptom",
  },
  {
    title: "Service",
    dataIndex: "Services",
  },
  {
    title: "Day Of Examine",
    dataIndex: "updated_at",
    render: (data) => moment(data).format("DD/MM/YYYY"),
  },
];
