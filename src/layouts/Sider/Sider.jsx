import { LogoutOutlined } from "@ant-design/icons";
import { css } from "@emotion/react";
import { Button, Col, Layout, Menu, Row } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import doctor from "./doctor.png";
import { menuItems } from "./menuItems";

const Sider = () => {
  const { pathname } = useLocation();
  const history = useHistory();
  const [activeMenuKey, setActiveMenuKey] = useState("");
  const { setCurrentUser } = useAuth();

  const loopMenuArray = useCallback((menuArray = [], pathname = "", activeItem = "") => {
    for (const menuItem of menuArray) {
      const isParent = !!menuItem.children && Array.isArray(menuItem.children) && menuItem.children.length > 0;
      const isMatchPathname = menuItem.key === pathname;

      if (isParent) {
        loopMenuArray(menuItem.children, pathname, activeItem);
      } else if (isMatchPathname) {
        activeItem.key = menuItem.key;
        break;
      }
    }
  }, []);

  const getActiveKey = useCallback(() => {
    let activeItem = {};

    loopMenuArray(menuItems, pathname, activeItem);

    return activeItem?.key || "";
  }, [loopMenuArray, pathname]);

  useEffect(() => {
    if (!activeMenuKey) {
      const key = getActiveKey();
      setActiveMenuKey(key);
    }
  }, [activeMenuKey, getActiveKey]);

  const handleChangeMenu = ({ key }) => {
    setActiveMenuKey(key);
    history.push(key);
  };

  return (
    <Layout.Sider css={styleSider} width={300}>
      <Row align="middle" justify="space-between">
        <Col>
          <div css={styleLogo}>MEDCARE</div>
        </Col>

        <Col>
          <Button
            type="primary"
            danger
            icon={<LogoutOutlined />}
            style={{ marginRight: 20 }}
            onClick={() => {
              setCurrentUser();
              localStorage.clear();
              window.location.reload();
            }}
          />
        </Col>
      </Row>

      <Menu
        theme="dark"
        items={menuItems.map((item) => ({ ...item, label: item.label }))}
        onSelect={handleChangeMenu}
        selectedKeys={[activeMenuKey]}
      />
      <div style={{ height: "20%" }}></div>
      <div
        style={{
          height: "40%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={doctor} alt="Ảnh Bác Sĩ" style={{ height: "60%", width: "80%" }} />{" "}
      </div>
    </Layout.Sider>
  );
};

export default Sider;

const styleSider = css({
  height: "100vh",
  overflow: "auto",
  position: "sticky",
  top: 0,
  "*": {
    color: "#fff",
  },
});

const styleLogo = css({
  fontSize: 30,
  color: "#4ff4f2",
  height: 60,
  lineHeight: "60px",
  paddingLeft: 15,
  fontWeight: "500",
});
