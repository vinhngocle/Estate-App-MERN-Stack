import axios from "axios";

const apiRequest = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: false,
});

export default apiRequest;
