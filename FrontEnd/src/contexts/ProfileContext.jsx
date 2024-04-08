import { createContext, useContext } from "react";
import { profilePictureRequest } from "../api/profile.js";

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

  return (
    <ProfileContext.Provider
      value={{
        profilePicture,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;
