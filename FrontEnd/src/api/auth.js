import axios from "./axios.js";

export const signUpRequest = async (user) => axios.post("/signUp", user);

export const signInRequest = async (user) => axios.post("/signIn", user);

export const verifyTokenRequest = async () => axios.get("/verifyToken");
