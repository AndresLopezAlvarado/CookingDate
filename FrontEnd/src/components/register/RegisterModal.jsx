import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";
import RegisterForm from "./RegisterForm";
import { useAuth } from "../../contexts/AuthContext";

const RegisterModal = ({ isOpen, toggleModalLogin, toggleModalRegister }) => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(!loading);
    await signUp(data);
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
