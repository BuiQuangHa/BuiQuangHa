import { Modal as AntdModal } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";

let Modal = ({ children, danger = false, title, width = 400, onOk = () => {}, onCancel = () => {}, ...props }, ref) => {
  const [open, setOpen] = useState(false);
  const [initData, setInitData] = useState();
  const [loading, setLoading] = useState(false);

  const handleOpen = (data) => {
    setOpen(true);
    setInitData(data);
  };

  const handleClose = () => {
    setOpen(false);
    setLoading(false);
    onCancel();
  };

  const handleClickOk = () => {
    onOk(initData);
  };

  useImperativeHandle(ref, () => ({
    openModal: handleOpen,
    closeModal: handleClose,
    close: handleClose,
    setLoading,
    initData,
  }));

  return (
    <AntdModal
      open={open}
      title={title || "Title"}
      onCancel={handleClose}
      width={width}
      confirmLoading={loading}
      onOk={handleClickOk}
      {...props}
    >
      {children}
    </AntdModal>
  );
};

Modal = forwardRef(Modal);

export { Modal };
