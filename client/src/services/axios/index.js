import { axiosConfig, getJWT } from "./config";

const axios = require("axios");

let AxiosCancelToken = axios.CancelToken;
let AxiosSource = AxiosCancelToken.source();

const token = getJWT();
if (token) {
  axios.defaults.headers.common["Authorization"] = token;
} else {
  axios.defaults.headers.common["Authorization"] = null;
}

axios.defaults.headers.common["cancelToken"] = AxiosSource.token;

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";
axios.defaults.headers.patch["Content-Type"] = "application/json";

export default axios.create({
  baseURL: axiosConfig.baseURL,
});

export const getHeaders = () => {
  let options = {
    Authorization: getJWT(),
    headers: {
      "Content-Type": "application/json",
    },
    cancelToken: AxiosSource.token,
  };

  return {
    options,
  };
};
