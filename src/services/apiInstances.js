import axios from "axios";

import { localKey } from "../constants/keys";

export const mainInstance = axios.create({
  baseURL: "http://localhost:8080",
});

mainInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem(localKey.accessToken);

    if (!!accessToken) {
      config.headers = {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export const common_get = (url, params) => mainInstance.get(url, { params }).then((res) => res);

export const common_post = (url, params) => mainInstance.post(url, params).then((res) => res.data);

export const common_put = (url, params) => mainInstance.put(url, params).then((res) => res);

export const common_patch = (url, params) => mainInstance.patch(url, params).then((res) => res);

export const common_delete = (url, params) => mainInstance.delete(url, { data: params }).then((res) => res);
