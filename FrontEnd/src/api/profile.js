import axios from "./axios.js";

export const updateProfileRequest = async (id, newData) => {
  const form = new FormData();
  for (let key in newData) form.append(key, newData[key]);

  return await axios.put(`/profile/${id}`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const profilePictureRequest = async (userId, profilePicture) => {
  const formPhoto = new FormData();
  formPhoto.append("profilePicture", profilePicture);

  return await axios.put(`/profile/profilePicture/${userId}`, formPhoto, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const uploadPhotosRequest = async (id, photos) => {
  const formPhotos = new FormData();
  for (let key in photos) formPhotos.append(key, photos[key]);

  return await axios.put(`/profile/uploadPhotos/${id}`, formPhotos, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deletePhotoRequest = async (id, photoToDelete) => {
  const formPhotoToDelete = new FormData();
  for (let key in photoToDelete)
    formPhotoToDelete.append(key, photoToDelete[key]);

  return await axios.post(`/profile/deletePhoto/${id}`, formPhotoToDelete, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
