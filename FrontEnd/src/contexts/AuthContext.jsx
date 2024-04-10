import { createContext, useContext, useEffect, useState } from "react";
import jsCookie from "js-cookie";
import {
  loginRequest,
  registerRequest,
  verifyTokenRequest,
  getUserRequest,
  getUsersRequest,
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
      Partitioned: true,
    });
    setIsAuthenticated(false);
    setUser(null);
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
    const res = await getUsersRequest();
    setUsers(res.data);
    try {
    } catch (error) {
      console.log({
        message: "Something went wrong on getUsers",
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
