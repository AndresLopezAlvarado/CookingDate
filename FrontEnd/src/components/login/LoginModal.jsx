import React, { useState } from "react";
import Modal from "../Modal";
import LoginForm from "./LoginForm";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ isOpen, toggleModalLogin, toggleModalRegister }) => {
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    console.log("Estoy en handleSubmit de LoginModal");
    setLoading(!loading);
    signIn(data);
    toggleModalLogin();
    navigate("/people");
  };

  return (
    <Modal isOpen={isOpen} onClose={toggleModalLogin}>
      <LoginForm onSubmit={handleSubmit} toggleModalLogin={toggleModalLogin} toggleModalRegister={toggleModalRegister}/>
    </Modal>
  );
};

export default LoginModal;
