import React, { createContext, useContext, useState } from "react";

const ToggleContext = createContext();

export const useToggle = () => {
  const context = useContext(ToggleContext);

  if (!context)
    throw new Error("useToggle must be used within an ToggleProvider");

  return context;
};

export const ToggleProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState({
    login: false,
    register: false,
    profile: false,
    uploadPhotos: false,
    chat: false,
    notifications: false,
  });

  const toggleModal = (t) => {
    if (t) {
      // console.log(t.target.id);
      switch (t.target.id) {
        case "openSignIn":
          setIsOpen({
            login: true,
            register: false,
            profile: false,
            uploadPhotos: false,
            chat: false,
            notifications: false,
          });
          break;

        case "openSignUp":
          setIsOpen({
            login: false,
            register: true,
            profile: false,
            uploadPhotos: false,
            chat: false,
            notifications: false,
          });
          break;

        case "openEditProfile":
          setIsOpen({
            login: false,
            register: false,
            profile: true,
            uploadPhotos: false,
            chat: false,
            notifications: false,
          });
          break;

        case "openUploadPhotos":
          setIsOpen({
            login: false,
            register: false,
            profile: false,
            uploadPhotos: true,
            chat: false,
            notifications: false,
          });
          break;

        case "openChat":
          setIsOpen({
            login: false,
            register: false,
            profile: false,
            uploadPhotos: false,
            chat: true,
            notifications: false,
          });
          break;

        case "openNotifications":
          setIsOpen({
            login: false,
            register: false,
            profile: false,
            uploadPhotos: false,
            chat: false,
            notifications: true,
          });
          break;

        case "":
          setIsOpen({
            login: false,
            register: false,
            profile: false,
            uploadPhotos: false,
            chat: false,
            notifications: false,
          });
          break;

        default:
          break;
      }

      switch (t.target.text) {
        case "Sign in":
          setIsOpen({
            login: true,
            register: false,
            profile: false,
            uploadPhotos: false,
            chat: false,
            notifications: false,
          });
          break;

        default:
          break;
      }
    } else {
      setIsOpen({
        login: false,
        register: false,
        profile: false,
        uploadPhotos: false,
        notifications: false,
        chat: false,
      });
    }
  };

  return (
    <ToggleContext.Provider value={{ isOpen, toggleModal }}>
      {children}
    </ToggleContext.Provider>
  );
};

export default ToggleContext;
