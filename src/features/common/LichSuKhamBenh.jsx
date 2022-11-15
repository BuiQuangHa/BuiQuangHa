import { SearchOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useRef } from "react";

import { Table } from "../../components";
import { ChiTietLichSu } from "./ChiTietLichSu";

export const LichSuKhamBenh = () => {
  const detailRef = useRef();

  const handleClickDetail = (record) => detailRef.current?.openDrawer(record);

  return (
    <div>
      <Table
        columns={[
          ...columns,
          {
            title: "Actions",
            render: (_, record) => (
              <Button type="primary" onClick={() => handleClickDetail(record)} icon={<SearchOutlined />} />
            ),
          },
        ]}
        dataSource={[1]}
      />

      <ChiTietLichSu ref={detailRef} />
    </div>
  );
};

const columns = [
  {
    title: "Start date",
    dataIndex: "",
  },
  {
    title: "End date",
    dataIndex: "",
  },
  {
    title: "Main disease diagnosis ",
    dataIndex: "",
  },
  {
    title: "Sub disease diagnosis",
    dataIndex: "",
  },
  {
    title: "Definitive diagnosis",
    dataIndex: "",
  },
  {
    title: "Doctor",
    dataIndex: "",
  },
  {
    title: "Room",
    dataIndex: "",
  },
];
