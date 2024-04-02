import { createContext, useContext, useEffect, useState } from "react";
import jsCookie from "js-cookie";
import {
  loginRequest,
  registerRequest,
  verifyTokenRequest,
  getUserRequest,
  getUsersRequest,
  updateUserResquest,
  uploadPhotosRequest,
  deleteImageRequest,
} from "../api/auth.js";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");

  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const signUp = async (dataEntered) => {
    try {
      const newUser = await registerRequest(dataEntered);
      setUser(newUser.data);
      setIsAuthenticated(true);
    } catch (error) {
      // setErrors(error.response.data);
      setErrors(error.response.data.arrayErrors);
      console.log({
        message: "Something went wrong on signUp",
        errorMessage: error.response.data.message,
        arrayErrors: error.response.data.arrayErrors,
      });
    }
  };

  const signIn = async (dataEntered) => {
    try {
      console.log("Estoy en signIn de AuthContext.jsx");
      console.log(dataEntered);
      const authenticatedUser = await loginRequest(dataEntered);
      setUser(authenticatedUser.data);
      setIsAuthenticated(true);
    } catch (error) {
      // setErrors(error.response.data);
      setErrors(error.response.data.arrayErrors);
      console.log({
        message: "Something went wrong on signIn",
        errorMessage: error.response.data.message,
        arrayErrors: error.response.data.arrayErrors,
      });
    }
  };

  const logout = () => {
    jsCookie.remove("access_token", {
      sameSite: "none",
      secure: true,
      httpOnly: true,
      Partitioned: true,
    });
    setIsAuthenticated(false);
    setUser(null);
  };

  const updateUser = async (id, newData) => {
    try {
      console.log("Estoy en updateUser de AuthContext.jsx");
      await updateUserResquest(id, newData);
    } catch (error) {
      console.log({
        message: "Something went wrong on updateUser",
      });
    }
  };

  const getUser = async (id) => {
    try {
      const res = await getUserRequest(id);
      return res.data;
    } catch (error) {
      console.log({
        message: "Something went wrong on getUser",
      });
    }
  };

  const getUsers = async () => {
    console.log("Estoy en getUsers de AuthContext.jsx");
    const res = await getUsersRequest();
    console.log(res);
    setUsers(res.data);
    try {
    } catch (error) {
      console.log({
        message: "Something went wrong on getUsers",
      });
    }
  };

  const uploadPhotos = async (id, photos) => {
    console.log("Estoy en uploadPhotos de AuthContext.jsx");
    console.log(photos);
    try {
      const res = await uploadPhotosRequest(id, photos);
    } catch (error) {
      console.log({
        message: "Something went wrong on uploadPhotos",
      });
    }
  };

  const deleteImage = async (id, photoToDelete) => {
    try {
      const res = await deleteImageRequest(id, photoToDelete);
    } catch (error) {
      console.log({
        message: "Something went wrong on deleteImage",
      });
    }
  };

  useEffect(() => {
    async function checkLogin() {
      const cookies = jsCookie.get();
      if (!cookies.access_token) {
        setLoading(false);
        setIsAuthenticated(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.access_token);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
        console.log({
          message: "Something went wrong on checkLogin",
          // errorMessage: error.message,
          // errorCode: error.code,
          // error: error,
        });
      }
    }
    checkLogin();
  }, []);

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => setErrors([]), 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        logout,
        getUser,
        getUsers,
        updateUser,
        uploadPhotos,
        deleteImage,
        user,
        users,
        isAuthenticated,
        loading,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
