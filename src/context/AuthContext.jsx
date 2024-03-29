import { Spin } from "antd";
import { createContext, useContext, useEffect, useState } from "react";

import { localKey } from "../constants";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const localUser = localStorage.getItem(localKey.userInfo);

  useEffect(() => {
    if (localUser) {
      const parsedUser = JSON.parse(localUser);
      setCurrentUser(parsedUser);
      console.log("user info", parsedUser);
    }
    setLoading(false);
  }, [localUser]);

  const value = {
    currentUser,
    setCurrentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <Spin spinning={true} tip="Loading...">
          <div style={{ width: "100vw", height: "100vh" }}></div>
        </Spin>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
