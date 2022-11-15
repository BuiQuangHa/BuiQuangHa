import { LogoutOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";

const KEY_DANG_XUAT = "LOGOUT";

export const UserDropdown = ({ children }) => {
  const handleClickMenu = ({ key }) => {
    if (key === KEY_DANG_XUAT) {
      console.log("logout");
    }
  };

  const menuItems = [{ key: KEY_DANG_XUAT, label: "Đăng xuất", icon: <LogoutOutlined /> }];

  return (
    <Dropdown
      overlay={<Menu items={menuItems.map((item) => ({ ...item, label: item.label }))} onClick={handleClickMenu} />}
    >
      {children}
    </Dropdown>
  );
};
