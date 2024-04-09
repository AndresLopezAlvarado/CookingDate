import React, { useState } from "react";
import Modal from "../Modal";
import ProfileForm from "./ProfileForm";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../contexts/ProfileContext";

const ProfileModal = ({ isOpen, toggleModal, user }) => {
  const [loading, setLoading] = useState(false);
  const { updateProfile } = useProfile();
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    setLoading(!loading);
    await updateProfile(user._id, data);
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
