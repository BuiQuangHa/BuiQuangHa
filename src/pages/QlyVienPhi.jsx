import { Layout } from "antd";
import React, { useRef, useState } from "react";

import { ContentUnpaid } from "../features/VienPhi/ContentUnpaid";
import { SiderVienPhi } from "./../features/VienPhi/SiderVienPhi";

const { Header, Content } = Layout;

const QlyVienPhi = () => {
  const siderRef = useRef();
  const [selectedAppointment, setSelectedAppointment] = useState();
  const [selectedSegment, setSelectedSegment] = useState();

  const handleSuccessPayUp = () => {
    siderRef.current?.getAllAppointment();
    setSelectedSegment("Paid");
  };

  return (
    <div>
      <Header
        className="Header"
        style={{
          color: "#4ff4f2",
          fontSize: "40px",
          height: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        CASHIER MANAGEMENT
      </Header>

      <Layout>
        <SiderVienPhi
          selectedAppointment={selectedAppointment}
          setSelectedAppointment={setSelectedAppointment}
          selectedSegment={selectedSegment}
          setSelectedSegment={setSelectedSegment}
          ref={siderRef}
        />

        <Content style={{ padding: "20px 20px 0px 20px" }}>
          <ContentUnpaid selectedAppointment={selectedAppointment} onSuccess={handleSuccessPayUp} />
        </Content>
      </Layout>
    </div>
  );
};

export default QlyVienPhi;
