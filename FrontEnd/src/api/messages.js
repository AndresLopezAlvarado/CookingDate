import axios from "./axios.js";

export const loadMessagesRequest = async (chatId) =>
  axios.get(`/messages/${chatId}`);

export const sendMessageRequest = async (chatId, content) =>
  axios.post(`/messages`, { chatId, content });
