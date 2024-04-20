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
  });

  const toggleModal = (t) => {
    if (t) {
      switch (t.target.textContent) {
        case "Sign in":
          setIsOpen({
            login: true,
            register: false,
            profile: false,
            uploadPhotos: false,
          });
          break;

        case "Sign In":
          setIsOpen({
            login: false,
            register: false,
            profile: false,
            uploadPhotos: false,
          });
          break;

        case "Sign In!":
          setIsOpen({
            login: true,
            register: false,
            profile: false,
            uploadPhotos: false,
          });
          break;

        case "Sign Up!":
          setIsOpen({
            login: false,
            register: true,
            profile: false,
            uploadPhotos: false,
          });
          break;

        case "Edit profile":
          setIsOpen({
            login: false,
            register: false,
            profile: true,
            uploadPhotos: false,
          });
          break;

        case "Upload photos":
          setIsOpen({
            login: false,
            register: false,
            profile: false,
            uploadPhotos: true,
          });
          break;

        case "":
          setIsOpen({
            login: false,
            register: false,
            profile: false,
            uploadPhotos: false,
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
