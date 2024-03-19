import { usePets } from "../../contexts/PetsContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PetForm from "./PetModal";

const PetCard = ({ pet }) => {
  const { deletePet, getPets, pets } = usePets();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleModal = (e) => {
    console.log("Estoy en toggleModal de PetCard");
    console.log(pets);
    if (e) e.stopPropagation();
    setIsOpen(!isOpen);
    console.log(pets);
    getPets();
    console.log(pets);
  };

  return (
    <>
      <div
        onClick={() => {
          navigate(`/findPet/${pet._id}`);
        }}
      >
        <div className="bg-zinc-900 hover:bg-zinc-700 text-white hover:text-black max-w-md w-full pl-8 pr-8 pt-4 pb-4 rounded-md h-full flex flex-col items-center justify-center text-center">
          <h1 className="text-2xl font-bold mb-4">{pet.name}</h1>

          <div className="mb-4">
            {pet.image && <img src={pet.image.url} className="rounded-md" />}
          </div>

          <p className="">{pet.age} years</p>
          <p className="mb-4">{pet.breed}</p>

          <div className="flex gap-x-2 items-center justify-center mb-4">
            <button
              onClick={toggleModal}
              className="bg-zinc-600 hover:bg-zinc-700 text-sm font-bold px-3 py-1 rounded-md"
            >
              Edit
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                deletePet(pet._id);
              }}
              className="bg-red-500 hover:bg-red-700 text-sm font-bold px-3 py-1 rounded-md"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <PetForm isOpen={isOpen} toggleModal={toggleModal} petId={pet._id} />
    </>
  );
};

export default PetCard;
