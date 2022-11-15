import { common_post } from "./apiInstances";

export const apiGetAllExams = (req) => common_post("/api/getAllExam", req);
export const apiAddNewExam = (req) => common_post("/api/addNewExam", req);
export const apiUpdateExam = (req) => common_post("/api/updateExam", req);
