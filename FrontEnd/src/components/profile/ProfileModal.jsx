import React, { useState } from "react";
import Modal from "../Modal";
import ProfileForm from "./ProfileForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ProfileModal = ({ isOpen, toggleModal, user }) => {
  const [loading, setLoading] = useState(false);
  const { updateUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    setLoading(!loading);
    // await updateUser(user._id, data);
    toggleModal();
    navigate(`/profile/${user._id}`);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={toggleModal}>
        <ProfileForm onSubmit={handleSubmit} user={user} />
      </Modal>
    </>
  );
};

export default ProfileModal;
