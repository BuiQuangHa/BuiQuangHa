import { CheckCircleFilled } from "@ant-design/icons";
import { Button, Form, Row, Space } from "antd";
import moment from "moment";
import Printd from "printd";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

import { notification } from "../../components";
import { FormThongTinKham } from "../common/FormThongTinKham";
import { useAntForm } from "./../../hooks/useAntForm";
import { apiUpdateExam } from "./../../services/exam";
import { HtmlPhieu } from "./HtmlPhieu";

let ThongTinKham = ({ selectedExam, onSuccess = () => {}, form, submitForm }) => {
  const [loading, setLoading] = useState(false);
  const printRef = useRef();
  const [html, setHtml] = useState();

  useEffect(() => {
    if (!!selectedExam) {
      form.setFields(
        Object.keys(selectedExam).map((name) => {
          return {
            name,
            value: selectedExam[name],
          };
        }),
      );
    }
  }, [form, selectedExam]);

  const readOnly = selectedExam?.Exam_Status === "COMPLETED";

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const values = await submitForm();

      console.log({ ...selectedExam, ...values });

      // return handlePrint({ ...selectedExam, ...values });

      const req = {
        ...values,
        ID: selectedExam.ID,
        Exam_Status: "COMPLETED",
      };

      await apiUpdateExam(req);

      handlePrint({ ...selectedExam, ...values });

      notification.success();
      onSuccess();
    } catch (error) {
      console.log(error);

      notification.error();
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = async (values) => {
    const d = new Printd();

    let html_phieu = HtmlPhieu;
    let data_phieu = values;

    Object.keys(data_phieu).forEach((key) => {
      html_phieu = replaceAll(html_phieu, `[${key}]`, data_phieu[key]);
    });

    html_phieu = replaceAll(
      html_phieu,
      `[REALTIME]`,
      moment().format("HH:mm") +
        " ngày " +
        moment().format("DD") +
        " tháng " +
        moment().format("MM") +
        " năm " +
        moment().format("YYYY"),
    );

    setHtml(html_phieu);

    setTimeout(() => {
      d.print(printRef.current, [
        ` section { min-height: 50vh; }
          section * { font-family: 'Times New Roman', Times, serif; }
          @media print {
            section, .signs-section { break-inside: avoid; }
          }
          .signs-section { margin-top: 10px; }
          table { margin-top: 20px; }
          table { border-collapse: collapse; }
          td { padding: 5px; }
        `,
      ]);
    }, 500);
  };

  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), "g"), replace);
  }

  return (
    <Form>
      <Row justify="space-between" align="middle" style={{ marginBottom: 20 }}>
        <Space>
          <h3>Examination Information</h3>

          {!!selectedExam && selectedExam.Exam_Status !== "COMPLETED" && (
            <Button
              type="primary"
              danger
              icon={<CheckCircleFilled />}
              onClick={() => handleSubmit()}
              loading={loading}
              disabled={!selectedExam}
            >
              Finish
            </Button>
          )}
        </Space>
      </Row>

      <Form form={form}>
        <FormThongTinKham readOnly={readOnly} />
      </Form>

      <div ref={printRef} dangerouslySetInnerHTML={{ __html: html }} className="print-src" />
    </Form>
  );
};

export { ThongTinKham };
