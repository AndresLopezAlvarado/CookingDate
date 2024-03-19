import axios from "./axios.js";

export const registerRequest = async (user) => axios.post("/register", user);

export const loginRequest = async (user) => axios.post("/login", user);

export const verifyTokenRequest = async () => axios.get("/verify");

export const getUserRequest = async (id) => axios.get(`/users/${id}`);

export const getUsersRequest = async () => axios.get("/users");

export const updateUserResquest = async (id, newData) => {
  console.log("Estoy en updateUserResquest de auth.js");
  const form = new FormData();
  for (let key in newData) form.append(key, newData[key]);
  console.log(form);
  return await axios.put(`/users/${id}`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
