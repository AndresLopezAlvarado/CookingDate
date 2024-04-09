import { createContext, useContext } from "react";
import { profilePictureRequest, updateProfileRequest } from "../api/profile.js";

const ProfileContext = createContext();

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context)
    throw new Error("useProfile must be used within an ProfileProvider");

  return context;
};

export const ProfileProvider = ({ children }) => {
  const profilePicture = async (userId, photo) => {
    try {
      const res = await profilePictureRequest(userId, photo);
    } catch (error) {
      console.error({
        message: "Something went wrong on profilePicture",
      });
    }
  };

  const updateProfile = async (id, newData) => {
    try {
      await updateProfileRequest(id, newData);
    } catch (error) {
      console.log({
        message: "Something went wrong on updateProfile",
      });
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        profilePicture,
        updateProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;
