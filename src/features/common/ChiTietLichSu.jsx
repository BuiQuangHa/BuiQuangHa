import { Form } from "antd";
import React, { useImperativeHandle, useState } from "react";
import { forwardRef } from "react";

import { Drawer } from "../../components";
import { FormThongTinKham } from "./FormThongTinKham";

let ChiTietLichSu = (props, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    openDrawer: handleOpen,
    closeDrawer: handleClose,
  }));

  const handleOpen = (data) => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Drawer open={isOpen} onClose={handleClose} width="50vw" header={{ title: "History detail" }} footer={null}>
      <Form>
        <FormThongTinKham readOnly />
      </Form>
    </Drawer>
  );
};

ChiTietLichSu = forwardRef(ChiTietLichSu);

export { ChiTietLichSu };
