import React from "react";
import { useLocation } from "react-router-dom";

import { paths } from "../constants";

export const SiderWrapper = ({ children }) => {
  const { pathname } = useLocation();

  const isAtLogin = pathname === paths.DANG_NHAP;

  if (isAtLogin) return <></>;

  return children;
};
