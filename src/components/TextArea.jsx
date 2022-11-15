import { ClassNames } from "@emotion/react";
import { Input } from "antd";

export const TextArea = ({ children, className, placeholder = "Enter", ...props }) => {
  return (
    <ClassNames>
      {({ cx, css }) => (
        <Input.TextArea className={cx(css(styleTextArea), className)} placeholder={placeholder} {...props}>
          {children}
        </Input.TextArea>
      )}
    </ClassNames>
  );
};

const styleTextArea = { resize: "none" };
