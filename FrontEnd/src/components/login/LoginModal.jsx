import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";
import LoginForm from "./LoginForm";
import { useAuth } from "../../contexts/AuthContext";

const LoginModal = ({ isOpen, toggleModalLogin, toggleModalRegister }) => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(!loading);
    await signIn(data);
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
