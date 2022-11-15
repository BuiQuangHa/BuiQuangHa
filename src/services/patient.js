import { common_post } from "./apiInstances";

export const apiGetAllPatients = (req) => common_post("/api/resources/patient/getAllPatient", req);
export const apiAddNewPatient = (req) => common_post("/api/resources/patient/addNewPatient", req);
export const apiUpdatePatient = (req) => common_post("/api/resources/patient/updatePatient", req);
