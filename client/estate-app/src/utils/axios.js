import axios from "axios";
// import baseApiUrl from "./Constants";
// var credentials = require("../services/credentials/credentials");

const Axios = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

Axios.interceptors.request.use(
  // async function (config) {
  //   var credentialsLocal = credentials.CredentialsService.getFromLocal();

  //   if (credentialsLocal !== null) {
  //     if (credentials.CredentialsService.isExpired()) {
  //       await credentials.CredentialsService.refreshToken();
  //     }
  //     config.headers["x-access-token"] = credentialsLocal.accessToken;
  //   }

  //   console.log(config);
  //   return config;
  // },

  (request) => {
    // console.log(request);
    return request;
  },
  (error) => {
    // console.log(error);
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => {
    // console.log(response);
    return response;
  },
  (error) => {
    // console.log(error);
    return Promise.reject(error);
  }
);

export default Axios;
