import { Form, notification } from "antd";

import { keys } from "../constants/keys";

const DURATION_CLOSE_NOTI = 3;

export const useAntForm = () => {
  const [form] = Form.useForm();

  const submitForm = async () => {
    try {
      const values = await form.validateFields();

      console.log("ANTD FORM - SUBMIT", values);

      return values;
    } catch (error) {
      error?.errorFields?.forEach((error, index) => {
        if (index === 0) form.scrollToField(error?.name[0]);

        notification.error({ placement: "bottomLeft", duration: DURATION_CLOSE_NOTI, message: error.errors.join(",") });
      });

      throw Error(keys.ANT_FORM_ERROR);
    }
  };

  return { form, submitForm };
};
