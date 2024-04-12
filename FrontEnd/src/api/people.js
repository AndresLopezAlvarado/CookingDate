import axios from "./axios.js";

export const getPeopleRequest = async () => axios.get("/people");

export const getPersonRequest = async (userId) => axios.get(`/people/${userId}`);
