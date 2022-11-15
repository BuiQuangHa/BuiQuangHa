import { Button, Checkbox, Form, Input } from "antd";
import React, { useState } from "react";

import { localKey } from "../constants/keys";
import { apiLogin } from "./../services/user";

const DangNhap = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    console.log("Success:", values);

    try {
      const res = await apiLogin(values);

      console.log(res);

      localStorage.setItem(localKey.accessToken, res.accessToken);
      localStorage.setItem(localKey.userInfo, JSON.stringify(res.user));
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      className="bigWrapper"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ height: "20vh", fontSize: "50px", fontWeight: 600, color: "#4a5fc1" }}> Login</div>
      <div style={{ height: "40vh", width: "300px", display: "flex", justifyContent: "flex-start" }}>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="UserName"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default DangNhap;
