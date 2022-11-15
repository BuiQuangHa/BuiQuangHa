import { common_post } from "./apiInstances";

export const apiLogin = (req) => common_post("/api/public/auth/login", req);
export const apiGetAllUsers = (req) => common_post("/api/resources/users/getAllUsers", req);
export const apiGetUserById = (req) => common_post("/api/resources/users/getUserByID", req);
export const apiAddNewUser = (req) => common_post("/api/resources/users/addNewUser", req);
export const apiUpdateUser = (req) => common_post("/api/resources/users/updateUser", req);
