import { Form, Layout } from "antd";
import moment from "moment";
import { useRef, useState } from "react";

import { SiderKhamBenh, TabsKhamBenh } from "../features/KhamBenh";
import { useAntForm } from "../hooks/useAntForm";

const { Header, Content } = Layout;

const QlyKhamBenh = () => {
  const siderRef = useRef();
  const contentRef = useRef();
  const [selectedExam, setSelectedExam] = useState();
  const [selectedSegment, setSelectedSegment] = useState();
  const [form] = Form.useForm();
  const { form: formTtKham, submitForm } = useAntForm();

  const handleSelectExam = (record) => {
    setSelectedExam(record);

    form.setFields(
      Object.keys(record).map((name) => {
        if (name === "DoB") {
          return {
            name,
            value: moment(record[name].slice(0, 11), "YYYY-MM-DD").format("DD/MM/YYYY"),
          };
        }

        return {
          name,
          value: record[name],
        };
      }),
    );
  };

  const onSuccess = () => {
    siderRef.current?.getAllExams();
    setSelectedSegment("Completed");
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
        EXAMINE MANAGEMENT
      </Header>

      <Layout>
        <SiderKhamBenh
          ref={siderRef}
          selectedExam={selectedExam}
          selectedSegment={selectedSegment}
          setSelectedExam={handleSelectExam}
          setSelectedSegment={setSelectedSegment}
        />

        <Content style={{ padding: "20px 20px 0px 20px" }}>
          <TabsKhamBenh
            ref={contentRef}
            selectedExam={selectedExam}
            form={form}
            onSuccess={onSuccess}
            formTTKham={formTtKham}
            submitForm={submitForm}
          />
        </Content>
      </Layout>
    </div>
  );
};

export default QlyKhamBenh;
