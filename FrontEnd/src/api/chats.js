import axios from "./axios.js";

export const loadChatsRequest = async () => axios.get("/chats");

export const loadChatRequest = async (userId, personId) =>
  axios.post("/chats", { userId, personId });
