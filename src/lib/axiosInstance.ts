import axios from "axios";
import config from "../config";

const axiosInstance = axios.create({
  baseURL: config.wildfire.baseUrl,
  timeout: 10000, // Set a timeout of 10 seconds
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
export default axiosInstance;
