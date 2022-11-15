import { Table } from "../../components";

export const ContentPaid = () => {
  return <Table dataSource={[]} columns={columns} />;
};

const columns = [
  {
    title: "Service name",
    dataIndex: "SERVICE_NAME",
  },
  {
    title: "Price",
    dataIndex: "SERVICE_NAME",
  },
  {
    title: "Quantity",
    dataIndex: "SERVICE_NAME",
  },
  {
    title: "Amount",
    dataIndex: "SERVICE_NAME",
  },
  {
    title: "Discount",
    dataIndex: "SERVICE_NAME",
  },
  {
    title: "Done exam",
    dataIndex: "SERVICE_NAME",
  },
];
