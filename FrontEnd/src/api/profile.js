import axios from "./axios.js";

export const profilePictureRequest = async (userId, profilePicture) => {
  const formPhoto = new FormData();
  formPhoto.append("profilePicture", profilePicture);

  return await axios.put(`/profile/profilePicture/${userId}`, formPhoto, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const updateProfileRequest = async (id, newData) => {
  const form = new FormData();
  for (let key in newData) form.append(key, newData[key]);

  return await axios.put(`/profile/${id}`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
