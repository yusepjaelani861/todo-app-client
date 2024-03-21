import axiosService from "axios";

const axios = axiosService.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axios;
