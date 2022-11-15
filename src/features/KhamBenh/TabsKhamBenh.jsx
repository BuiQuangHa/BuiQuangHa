import { css } from "@emotion/react";
import { Tabs } from "antd";
import { forwardRef, useImperativeHandle } from "react";

import { ThongTinBenhNhan } from "./ThongTinBenhNhan";
import { ThongTinKham } from "./ThongTinKham";

let TabsKhamBenh = ({ selectedExam, form, onSuccess = () => {}, formTTKham, submitForm = () => {} }) => {
  return (
    <Tabs type="card" css={cssTabs}>
      <Tabs.TabPane key="PATIENT_INFO" tab="Patient Info">
        <ThongTinBenhNhan form={form} />
      </Tabs.TabPane>

      <Tabs.TabPane key="EXAM_INFO" tab="Exam info">
        <ThongTinKham selectedExam={selectedExam} onSuccess={onSuccess} form={formTTKham} submitForm={submitForm} />
      </Tabs.TabPane>
    </Tabs>
  );
};

export { TabsKhamBenh };

const cssTabs = css({
  ".ant-tabs-nav": { marginBottom: 0 },
  ".ant-tabs-content-holder": {
    height: "calc(100vh - 210px)",
    backgroundColor: "#fff",
    padding: 20,
    overflow: "auto",
  },
});
