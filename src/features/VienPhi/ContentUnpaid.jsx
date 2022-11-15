import { nanoid } from "@reduxjs/toolkit";
import { Button, Col, Row } from "antd";
import { useMemo, useState } from "react";

import { Table } from "../../components";
import { apiUpdateAppointment } from "../../services/appointment";

export const ContentUnpaid = ({ selectedAppointment, onSuccess = () => {} }) => {
  const [loading, setLoading] = useState(false);

  const dataSource = useMemo(() => {
    let arr = [];

    if (!!selectedAppointment) {
      arr = [selectedAppointment.Services];
    }

    return arr.map((item) => ({
      key: nanoid(),
      Name: item,
      Price: 100,
      Quantity: 1,
      Amount: 100,
    }));
  }, [selectedAppointment]);

  const totalPrice = useMemo(() => dataSource.reduce((sum, item) => (sum += item?.Price), 0), [dataSource]);

  const handlePay = async () => {
    setLoading(true);

    try {
      const req = {
        ID: selectedAppointment?.Welcome_ID,
        IsPayment: true,
      };

      await apiUpdateAppointment(req);

      onSuccess();
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Table dataSource={dataSource} columns={columns} />

      <div style={{ paddingInline: 10 }}>
        <Row gutter={20} align="middle" justify="end" style={{ marginTop: 20 }}>
          <Col>
            Total paid: <b>{totalPrice || 0}$</b>
          </Col>

          {selectedAppointment && !selectedAppointment.isPayment && (
            <Col>
              <Button type="primary" disabled={!selectedAppointment} onClick={handlePay} loading={loading}>
                Pay up
              </Button>
            </Col>
          )}
        </Row>
      </div>
    </>
  );
};

const columns = [
  {
    title: "Service name",
    dataIndex: "Name",
  },
  {
    title: "Price",
    dataIndex: "Price",
    render: (data) => `${data || 0}$`,
  },
  {
    title: "Quantity",
    dataIndex: "Quantity",
  },
  {
    title: "Amount",
    dataIndex: "Amount",
    render: (data) => `${data || 0}$`,
  },
  // {
  //   title: "Done exam",
  //   dataIndex: "SERVICE_NAME",
  // },
];
