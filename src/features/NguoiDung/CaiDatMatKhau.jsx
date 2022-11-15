import { Form, Input } from "antd";
import { useState } from "react";

import { Modal, notification } from "../../components";
import { keys } from "../../constants/keys";
import { apiUpdateUser } from "../../services/user";
import { useAntForm } from "./../../hooks";

export const CaiDatMatKhau = ({ modalRef }) => {
  const { form, submitForm } = useAntForm();

  const handleOk = async () => {
    try {
      modalRef.current?.setLoading(true);

      const values = await submitForm();

      console.log(values);

      const req = {
        ...values,
        ID: modalRef.current?.initData?.ID,
      };

      await apiUpdateUser(req);

      notification.success();

      handleClose();

      modalRef.current?.closeModal();
    } catch (error) {
      console.log(error);

      if (error.message !== keys.ANT_FORM_ERROR) {
        notification.error();
      }
    } finally {
      modalRef.current?.setLoading(false);
    }
  };

  const handleClose = () => {
    form.resetFields();
  };

  return (
    <Modal ref={modalRef} title="Setup password" onOk={handleOk} onCancel={handleClose}>
      <Form form={form} layout="vertical">
        <Form.Item label="New password" name="Password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};
