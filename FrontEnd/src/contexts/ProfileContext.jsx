import { createContext, useContext } from "react";
import {
  updateProfileRequest,
  profilePictureRequest,
  uploadPhotosRequest,
  deletePhotoRequest,
} from "../api/profile.js";

const ProfileContext = createContext();

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context)
    throw new Error("useProfile must be used within an ProfileProvider");

  return context;
};

export const ProfileProvider = ({ children }) => {
  const updateProfile = async (id, newData) => {
    try {
      await updateProfileRequest(id, newData);
    } catch (error) {
      console.log({
        message: "Something went wrong on updateProfile",
      });
    }
  };

  const profilePicture = async (userId, photo) => {
    try {
      const res = await profilePictureRequest(userId, photo);
    } catch (error) {
      console.error({
        message: "Something went wrong on profilePicture",
      });
    }
  };

  const uploadPhotos = async (id, photos) => {
    try {
      const res = await uploadPhotosRequest(id, photos);
    } catch (error) {
      console.log({
        message: "Something went wrong on uploadPhotos",
      });
    }
  };

  const deletePhoto = async (id, photoToDelete) => {
    try {
      const res = await deletePhotoRequest(id, photoToDelete);
    } catch (error) {
      console.log({
        message: "Something went wrong on deleteImage",
      });
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        updateProfile,
        profilePicture,
        uploadPhotos,
        deletePhoto,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;
