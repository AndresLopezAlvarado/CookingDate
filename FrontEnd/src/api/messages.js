import axios from "./axios.js";

export const loadMessagesRequest = async (chatId) =>
  axios.get(`/message/${chatId}`);

export const sendMessageRequest = async (chatId, content) =>
  axios.post(`/message`, { chatId, content });
