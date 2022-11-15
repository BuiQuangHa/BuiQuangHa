import { common_post } from "./apiInstances";

export const apiGetAllAppointments = (req) => common_post("/api/welcome/getAllWelcome", req);
export const apiAddNewAppointment = (req) => common_post("/api/welcome/newWelcome", req);
export const apiUpdateAppointment = (req) => common_post("/api/welcome/updateWelcome", req);
