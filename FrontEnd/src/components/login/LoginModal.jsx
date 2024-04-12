import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";
import LoginForm from "./LoginForm";
import { useAuth } from "../../contexts/AuthContext";

const LoginModal = ({ isOpen, toggleModal }) => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(!loading);
    await signIn(data);
    toggleModal();
    navigate("/people");
  };

  return (
    <Modal isOpen={isOpen} onClose={toggleModal}>
      <LoginForm onSubmit={handleSubmit} toggleModal={toggleModal} />
    </Modal>
  );
};

export default LoginModal;
