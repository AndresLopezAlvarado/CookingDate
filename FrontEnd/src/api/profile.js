import axios from "./axios.js";

export const updateProfileRequest = async (userId, newData) => {
  const formUpdateProfile = new FormData();
  for (let key in newData) formUpdateProfile.append(key, newData[key]);

  return await axios.put(`/profile/${userId}`, formUpdateProfile, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const profilePictureRequest = async (userId, profilePicture) => {
  const formProfilePicture = new FormData();
  formProfilePicture.append("profilePicture", profilePicture);

  return await axios.put(
    `/profile/profilePicture/${userId}`,
    formProfilePicture,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};

export const uploadPhotosRequest = async (userId, photos) => {
  const formUploadPhotos = new FormData();
  for (let key in photos) formUploadPhotos.append(key, photos[key]);

  return await axios.put(`/profile/uploadPhotos/${userId}`, formUploadPhotos, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deletePhotoRequest = async (userId, photoToDelete) => {
  const formDeletePhoto = new FormData();
  for (let key in photoToDelete)
    formDeletePhoto.append(key, photoToDelete[key]);

  return await axios.post(`/profile/deletePhoto/${userId}`, formDeletePhoto, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
