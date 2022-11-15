import { Input as AntdInput } from "antd";
import { useMemo } from "react";

let Input = ({ placeholder = "", style = {}, readOnly = false, ...props }) => {
  const formatPlaceholder = useMemo(() => {
    if (readOnly) return placeholder;
    else if (!placeholder) return "Enter";
    else return placeholder;
  }, [placeholder, readOnly]);

  return <AntdInput placeholder={formatPlaceholder} readOnly={readOnly} {...props} />;
};

const Password = ({ placeholder = "Enter", ...props }) => <AntdInput.Password placeholder={placeholder} {...props} />;

Input.Password = Password;

export { Input };
