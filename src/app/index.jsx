import { LoadingOutlined } from "@ant-design/icons";
import { css } from "@emotion/react";
import { Layout, Result } from "antd";
import { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { paths } from "../constants";
import { Sider } from "../layouts";
import { AuthRoute, PrivateRoute } from "./ConfigRoutes";
import { SiderWrapper } from "./SiderWrapper";
import { DangNhap } from "./elements";
import { routes } from "./routes";

export const App = () => {
  return (
    <Layout>
      <SiderWrapper>
        <Sider />
      </SiderWrapper>

      <Layout.Content css={styleContent}>
        <Suspense fallback={<LoadingOutlined />}>
          <Switch>
            <AuthRoute exact path={paths.DANG_NHAP} component={DangNhap} />

            {routes.map((route) => (
              <PrivateRoute exact key={route.path} path={route.path} component={route.element} />
            ))}

            <Redirect path={paths.MAIN} to={paths.QLY_NGUOI_DUNG} />
            <Route render={() => <Result status="404" />} />
          </Switch>
        </Suspense>
      </Layout.Content>
    </Layout>
  );
};

const styleContent = css({
  padding: 20,
});
