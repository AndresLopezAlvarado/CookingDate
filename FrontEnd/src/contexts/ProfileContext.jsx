import { createContext, useContext } from "react";
import {
  updateProfileRequest,
  profilePictureRequest,
  uploadPhotosRequest,
  deletePhotoRequest,
} from "../api/profile.js";
import { useAuth } from "./AuthContext.jsx";

const ProfileContext = createContext();

export const useProfile = () => {
  const context = useContext(ProfileContext);

  if (!context)
    throw new Error("useProfile must be used within an ProfileProvider");

  return context;
};

export const ProfileProvider = ({ children }) => {
  const { user, setUser } = useAuth();

  const updateProfile = async (userId, newData) => {
    try {
      const updatedUser = await updateProfileRequest(userId, newData);
      setUser(updatedUser.data);
    } catch (error) {
      console.error({
        message: "Something went wrong on updateProfile",
      });
    }
  };

  const profilePicture = async (userId, photo) => {
    try {
      const updatedUser = await profilePictureRequest(userId, photo);
      setUser(updatedUser.data);
    } catch (error) {
      console.error({
        message: "Something went wrong on profilePicture",
      });
    }
  };

  const uploadPhotos = async (userId, photos) => {
    try {
      const updatedUser = await uploadPhotosRequest(userId, photos);
      setUser(updatedUser.data);
    } catch (error) {
      console.error({
        message: "Something went wrong on uploadPhotos",
      });
    }
  };

  const deletePhoto = async (userId, photoToDelete) => {
    try {
      const updatedUser = await deletePhotoRequest(userId, photoToDelete);
      setUser(updatedUser.data);
    } catch (error) {
      console.error({
        message: "Something went wrong on deletePhoto",
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
