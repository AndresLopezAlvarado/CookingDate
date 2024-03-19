import React, { useState } from "react";
import Modal from "../Modal";
import RegisterForm from "./RegisterForm";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const RegisterModal = ({ isOpen, toggleModalLogin, toggleModalRegister }) => {
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    console.log("Estoy en handleSubmit de RegisterModal");
    setLoading(!loading);
    signUp(data);
    toggleModalRegister();
    navigate("/people");
  };

  return (
    <Modal isOpen={isOpen} onClose={toggleModalRegister}>
      <RegisterForm onSubmit={handleSubmit} toggleModalLogin={toggleModalLogin} toggleModalRegister={toggleModalRegister} />
    </Modal>
  );
};

export default RegisterModal;
