import axios from "./axios.js";

export const registerRequest = async (user) => axios.post("/register", user);

export const loginRequest = async (user) => axios.post("/login", user);

export const verifyTokenRequest = async () => axios.get("/verify");

export const getUserRequest = async (id) => axios.get(`/users/${id}`);

export const getUsersRequest = async () => axios.get("/users");

export const updateUserResquest = async (id, newData) => {
  const form = new FormData();
  for (let key in newData) form.append(key, newData[key]);

  return await axios.put(`/users/${id}`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const uploadPhotosRequest = async (id, photos) => {
  const formPhotos = new FormData();
  for (let key in photos) formPhotos.append(key, photos[key]);

  return await axios.put(`/profile/${id}`, formPhotos, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteImageRequest = async (id, photoToDelete) => {
  const formPhotoToDelete = new FormData();
  for (let key in photoToDelete)
    formPhotoToDelete.append(key, photoToDelete[key]);

  return await axios.post(`/profile/${id}`, formPhotoToDelete, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
