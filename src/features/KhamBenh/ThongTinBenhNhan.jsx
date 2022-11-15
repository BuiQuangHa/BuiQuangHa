import { Col, Form, Input, Row } from "antd";
import React from "react";

export const ThongTinBenhNhan = ({ form }) => {
  return (
    <Form form={form} layout="vertical">
      <Row gutter={10}>
        <Col span={6}>
          <Form.Item label="Patient Code" name="Code">
            <Input readOnly />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item label="Name" name="Name">
            <Input readOnly />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item label="Gender" name="Sex">
            <Input readOnly />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item label="DOB" name="DoB">
            <Input readOnly />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item label="Email" name="Email">
            <Input readOnly />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item label="Phone" name="Phone">
            <Input readOnly />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Address" name="Address">
            <Input readOnly />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item label="Nationality" name="Nationality">
            <Input readOnly />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item label="Occupation" name="Occupation">
            <Input readOnly />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
