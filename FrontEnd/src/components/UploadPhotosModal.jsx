import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { useAuth } from "../contexts/AuthContext";
import PhotoGallery from "./PhotoGallery";

const UploadPhotosModal = ({ isOpen, toggleModal }) => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(!loading);
    await signUp(data);
    toggleModal();
    navigate("/people");
  };

  return (
    <Modal isOpen={isOpen} onClose={toggleModal}>
      <PhotoGallery toggleModal={toggleModal} />
    </Modal>
  );
};

export default UploadPhotosModal;
