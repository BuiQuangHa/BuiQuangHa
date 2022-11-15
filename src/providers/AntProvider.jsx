import { ConfigProvider } from "antd";

import { validateMessages } from "../constants";

export const AntProvider = ({ children }) => {
  return <ConfigProvider form={{ validateMessages }}>{children}</ConfigProvider>;
};
