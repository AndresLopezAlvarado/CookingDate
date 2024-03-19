import Modal from "../Modal";
import PetForm from "./PetForm";
import { usePets } from "../../contexts/PetsContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const PetModal = ({ isOpen, toggleModal, petId }) => {
  const { createPet, updatePet } = usePets();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { pets } = usePets();

  const handleSubmit = async (data) => {
    console.log("Estoy en handleSubmit de PetForm");
    console.log(pets);
    setLoading(!loading);
    console.log(pets);
    console.log(petId);
    if (petId) {
      await updatePet(petId, data);
    } else {
      await createPet(data);
    }
    console.log(pets);
    toggleModal();
    console.log(pets);
    navigate("/pets");
  };

  return (
    <Modal isOpen={isOpen} onClose={toggleModal}>
      <PetForm onSubmit={handleSubmit} petId={petId} />
    </Modal>
  );
};

export default PetModal;
