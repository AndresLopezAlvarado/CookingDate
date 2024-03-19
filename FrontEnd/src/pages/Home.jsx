import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoginModal from "../components/login/LoginModal.jsx";
import RegisterModal from "../components/register/RegisterModal.jsx";

const Home = () => {
  const { isAuthenticated, user } = useAuth();
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);

  const toggleModalLogin = () => {
    setIsOpenLogin(!isOpenLogin);
  };

  const toggleModalRegister = () => {
    setIsOpenRegister(!isOpenRegister);
  };

  return (
    <div className="bg-orange-400 rounded-md h-full flex flex-col items-center justify-center text-center">
      {isAuthenticated ? (
        <>
          <p className="bg-lime-900 text-orange-400 text-3xl font-bold p-4 my-4 rounded-md">
            Bienvenido {user.username}
          </p>

          {user.image && (
            <img src={user.image.url} className="mb-4 rounded-full" />
          )}

          <p className=" bg-lime-900 text-orange-400 font-bold inline-block mb-4 p-4 justify-center rounded-md">
            Come on,{" "}
            <Link to="/people" className="text-lime-500">
              find a date!
            </Link>
          </p>
        </>
      ) : (
        <>
          <img
            style={{ height: "350px", width: "350px" }}
            className="m-4 rounded-md"
            src="../src/assets/panOnStove.gif"
            alt="position"
          />

          <p className=" bg-lime-900 text-orange-400 font-bold inline-block mb-4 p-4 justify-center rounded-md">
            Do you want to find a cooking date?{" "}
            <Link onClick={toggleModalLogin} className="text-lime-500">
              Sign In!
            </Link>
          </p>
        </>
      )}
      <LoginModal
        isOpen={isOpenLogin}
        toggleModalLogin={toggleModalLogin}
        toggleModalRegister={toggleModalRegister}
      />
      <RegisterModal
        isOpen={isOpenRegister}
        toggleModalLogin={toggleModalLogin}
        toggleModalRegister={toggleModalRegister}
      />
    </div>
  );
};

export default Home;
