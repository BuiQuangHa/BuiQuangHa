import { LockOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useEffect, useRef, useState } from "react";

import { Table, TableActions, TopbarActions, notification } from "./../../components";
import { apiGetAllUsers, apiUpdateUser } from "./../../services/user";
import { CaiDatMatKhau } from "./CaiDatMatKhau";
import { CaiDatNguoiDung } from "./CaiDatNguoiDung";

export const DsNguoiDung = () => {
  const searchRef = useRef();
  const configRef = useRef();
  const passwordRef = useRef();
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDataSource();
  }, []);

  const getDataSource = async (search_string = searchRef.current?.searchValue) => {
    try {
      setLoading(true);

      const res = await apiGetAllUsers({ search_string });

      setDataSource(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClickAddNew = () => configRef.current?.open();

  const handleClickEdit = (record) => configRef.current?.open(record);

  const handleClickEditPassword = (record) => passwordRef.current?.openModal(record);

  const handleDeleteUser = async (record) => {
    try {
      const req = {
        ID: record.ID,
        IsActive: false,
      };

      await apiUpdateUser(req);

      getDataSource();
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div>
      <Table
        rowKey="ID"
        header={{
          showHeader: true,
          title: "User management",
          actions: (
            <TopbarActions
              onClickAddNew={handleClickAddNew}
              showDelete={false}
              showSelect={false}
              onSearch={getDataSource}
              searchRef={searchRef}
            />
          ),
        }}
        loading={loading}
        columns={[
          ...columns,
          {
            title: "Actions",
            width: "0px",
            render: (_, record) => (
              <TableActions
                record={record}
                onClickEditButton={handleClickEdit}
                prefixActions={
                  <Button type="link" icon={<LockOutlined />} onClick={() => handleClickEditPassword(record)} />
                }
                onDeleteRecords={handleDeleteUser}
              />
            ),
          },
        ]}
        dataSource={dataSource}
        onClickRow={handleClickEdit}
      />

      <CaiDatNguoiDung ref={configRef} onSuccess={() => getDataSource()} />

      <CaiDatMatKhau modalRef={passwordRef} />
    </div>
  );
};

const columns = [
  {
    title: "Name",
    dataIndex: "Name",
  },
  {
    title: "Username",
    dataIndex: "UserName",
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
    title: "Role",
    dataIndex: "Role",
  },
  {
    title: "Speciality",
    dataIndex: "Speciality",
  },
  {
    title: "Room",
    dataIndex: "Room_ID",
  },
];
