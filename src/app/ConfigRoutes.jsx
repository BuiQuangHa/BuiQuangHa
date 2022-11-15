import { Redirect, Route } from "react-router-dom";

import { paths } from "../constants";
import { useAuth } from "../context/AuthContext";

export const AuthRoute = ({ component: Component, ...remainingProps }) => {
  const { currentUser } = useAuth();
  const isAuth = !!currentUser;

  return (
    <Route
      {...remainingProps}
      render={(props) => {
        return isAuth ? <Redirect to={paths.MAIN} /> : <Component {...props} />;
      }}
    />
  );
};

export const PrivateRoute = ({ component: Component, ...remainingProps }) => {
  const { currentUser } = useAuth();
  const isAuth = !!currentUser;

  return (
    <Route
      {...remainingProps}
      render={(props) => {
        return isAuth ? <Component {...props} /> : <Redirect to={paths.DANG_NHAP} />;
      }}
    />
  );
};
