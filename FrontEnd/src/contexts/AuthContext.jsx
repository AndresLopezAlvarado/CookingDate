import { createContext, useContext, useEffect, useState } from "react";
import jsCookie from "js-cookie";
import {
  signUpRequest,
  signInRequest,
  verifyTokenRequest,
} from "../api/auth.js";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth must be used within an AuthProvider");

  return context;
};

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signUp = async (dataEntered) => {
    const newUser = await signUpRequest(dataEntered);

    setUser(newUser.data);
    setIsAuthenticated(true);
  };

  const signIn = async (dataEntered) => {
    const authenticatedUser = await signInRequest(dataEntered);

    setUser(authenticatedUser.data);
    setIsAuthenticated(true);
  };

  const logout = () => {
    jsCookie.remove("access_token", {
      sameSite: "none",
      secure: true,
      Partitioned: true,
    });

    setUser(null);
    setIsAuthenticated(false);
  };

  async function checkLogin() {
    setLoading(true);

    const cookies = jsCookie.get();

    if (!cookies.access_token) {
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      const res = await verifyTokenRequest(cookies.access_token);

      if (!res.data) {
        setUser(null);
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      setUser(res.data);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);

      console.error({
        message: "Something went wrong on checkLogin",
        error: error,
      });

      throw new Error({
        message: "Something went wrong on checkLogin",
        error: error,
      });
    }
  }

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        logout,
        loading,
        user,
        // setUser,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
