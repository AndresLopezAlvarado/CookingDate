import axios from "./axios.js";

export const getNotificationsRequest = async (userId) =>
  axios.post("/notifications", userId);
