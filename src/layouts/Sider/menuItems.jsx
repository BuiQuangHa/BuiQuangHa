import { DollarOutlined, HeartOutlined, SmileOutlined, UserOutlined } from "@ant-design/icons";

import { paths } from "../../constants";

export const menuItems = [
  { key: paths.QLY_NGUOI_DUNG, label: "Users", icon: <UserOutlined /> },
  { key: paths.QLY_TIEP_DON, label: "Reception", icon: <SmileOutlined /> },
  { key: paths.QLY_VIEN_PHI, label: "Payment", icon: <DollarOutlined /> },
  { key: paths.QLY_KHAM_BENH, label: "Examination", icon: <HeartOutlined /> },
];
