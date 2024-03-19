import axios from "axios";
import { VITE_BACKEND_URL } from "../../config.js";

const instance = axios.create({
  baseURL: `${VITE_BACKEND_URL}/api`,
  withCredentials: true,
});

export default instance;
