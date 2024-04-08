import axios from "./axios.js";

export const profilePictureRequest = async (userId, photo) => {

  const formPhoto = new FormData();
  formPhoto.append("photo", photo);

  return await axios.put(`/profile/${userId}`, formPhoto, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
