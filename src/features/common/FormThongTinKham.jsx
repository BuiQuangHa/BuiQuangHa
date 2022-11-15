import { Form } from "antd";

import { Input } from "../../components";

export const FormThongTinKham = ({ readOnly = false }) => {
  return (
    <>
      <Form.Item name="Symptom" label="Symptom">
        <Input readOnly={readOnly} />
      </Form.Item>

      <Form.Item name="MedicalProcedure" label="Medical procedure">
        <Input readOnly={readOnly} />
      </Form.Item>

      <Form.Item name="SelfMedHistory" label="Self Med-history">
        <Input readOnly={readOnly} />
      </Form.Item>

      <Form.Item name="FamilyMed" label="Family Med-history">
        <Input readOnly={readOnly} />
      </Form.Item>

      <Form.Item name="PhysicalExamination" label="Physical Examination">
        <Input readOnly={readOnly} />
      </Form.Item>

      <Form.Item name="MainDiseaseCode" label="Main disease code">
        <Input readOnly={readOnly} />
      </Form.Item>

      <Form.Item name="SubDiseaseCode" label="Sub disease code">
        <Input readOnly={readOnly} />
      </Form.Item>

      <Form.Item name="ClinicalDiagnosis" label="Clinical diagnosis">
        <Input readOnly={readOnly} />
      </Form.Item>

      <Form.Item name="DefinitiveDiagnosis" label="Definitive diagnosis">
        <Input readOnly={readOnly} />
      </Form.Item>

      <Form.Item name="Solution" label="Solution">
        <Input readOnly={readOnly} />
      </Form.Item>

      <Form.Item name="Note" label="Note">
        <Input readOnly={readOnly} />
      </Form.Item>
    </>
  );
};
