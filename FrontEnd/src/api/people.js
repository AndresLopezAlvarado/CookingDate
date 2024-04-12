import axios from "./axios.js";

export const getPeopleRequest = async () => axios.get("/people");

export const getUserRequest = async (userId) => axios.get(`/users/${userId}`);
