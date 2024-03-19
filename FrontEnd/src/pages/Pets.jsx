import React, { useEffect, useState } from "react";
import { VscEmptyWindow } from "react-icons/vsc";
import { usePets } from "../contexts/PetsContext.jsx";
import PetsTable from "../components/pets/PetsTable.jsx";
import PetsGrid from "../components/pets/PetsGrid.jsx";
import Spinner from "../components/Spinner.jsx";
import PetModal from "../components/pets/PetModal.jsx";

const Pets = () => {
  const { pets, getPets } = usePets();
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("card");
  const [isOpen, setIsOpen] = useState(false);

  const columns = [
    { header: "ID", accessorKey: "_id" },
    { header: "Name", accessorKey: "name" },
    { header: "Age", accessorKey: "age" },
    { header: "Breed", accessorKey: "breed" },
  ];

  const toggleModal = (e) => {
    console.log("Estoy en toggleModal de Pets");
    console.log(pets);
    setIsOpen(!isOpen);
    console.log(pets);
    getPets();
    console.log(pets);
  };

  useEffect(() => {
    console.log("Estoy en useEffect de Pets");
    console.log(pets);
    getPets();
    console.log(pets);
  }, []);

  return (
    <div className="rounded-md h-full flex flex-col items-center justify-center text-center">
      <div className="bg-zinc-900 p-4 rounded-md w-full flex items-center justify-between">
        <div className="flex justify-center items-center gap-x-2">
          <h1 className="text-white text-sm font-bold">View:</h1>

          <button
            className="bg-zinc-600 hover:bg-zinc-700 text-sm px-3 py-1 rounded-md"
            onClick={() => setShowType("card")}
          >
            Card
          </button>

          <button
            className="bg-zinc-600 hover:bg-zinc-700 text-sm px-3 py-1 rounded-md"
            onClick={() => setShowType("table")}
          >
            Table
          </button>
        </div>

        <button
          className="bg-zinc-600 hover:bg-zinc-700 text-sm font-bold px-3 py-1 rounded-md"
          onClick={toggleModal}
        >
          New pet
        </button>
      </div>

      <div className="bg-zinc-400 w-full p-4 mt-4 rounded-md">
        {pets.length === 0 && (
          <div className="flex flex-col justify-center items-center">
            <VscEmptyWindow className="w-48 h-48" />
            <h1>There are no pets</h1>
          </div>
        )}

        {loading ? (
          <Spinner />
        ) : showType === "table" ? (
          <PetsTable data={pets} columns={columns} />
        ) : (
          <PetsGrid />
        )}

        <PetModal isOpen={isOpen} toggleModal={toggleModal} />
      </div>
    </div>
  );
};

export default Pets;
