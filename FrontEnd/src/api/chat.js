import axios from "./axios.js";

export const loadChatRequest = async (userId, personId) =>
  axios.post("/chat", { userId, personId });
