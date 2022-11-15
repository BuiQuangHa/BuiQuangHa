import { InputNumber as AntdInputNumber } from "antd";

export const InputNumber = ({ formatCurrency = false, placeholder = "Enter", style = {}, ...props }) => {
  if (formatCurrency) {
    props.formatter = (value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    props.parser = (value) => value.replace(/\$\s?|(,*)/g, "");
  }

  return <AntdInputNumber placeholder={placeholder} style={{ width: "100%", ...style }} {...props} />;
};
