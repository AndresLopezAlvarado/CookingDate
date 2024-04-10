import axios from "./axios.js";

export const registerRequest = async (user) => axios.post("/register", user);

export const loginRequest = async (user) => axios.post("/login", user);

export const verifyTokenRequest = async () => axios.get("/verify");

export const getUserRequest = async (id) => axios.get(`/users/${id}`);

export const getUsersRequest = async () => axios.get("/users");




