import React, { createContext, useContext, useState } from "react";
import {
  getPetsRequest,
  createPetRequest,
  getPetRequest,
  updatePetRequest,
  deletePetRequest,
} from "../api/pets";

const PetsContext = createContext();

export const usePets = () => {
  const context = useContext(PetsContext);
  if (!context) throw new Error("usePets must be used within an PetsProvider");

  return context;
};

export function PetsProvider({ children }) {
  const [pets, setPets] = useState([]);

  const getPets = async () => {
    try {
      const res = await getPetsRequest();
      setPets(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createPet = async (pet) => {
    try {
      console.log("Estoy en createPet de PetsContext");
      console.log(pet);
      console.log(pets);
      const res = await createPetRequest(pet);
      console.log(res);
      console.log(pet);
      console.log(pets);
    } catch (error) {
      console.log(error);
    }
  };

  const getPet = async (id) => {
    try {
      const res = await getPetRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updatePet = async (id, pet) => {
    try {
      console.log("Estoy en updatePet de PetsContext");
      console.log(pet);
      console.log(pets);
      const res = await updatePetRequest(id, pet);
      console.log(res);
      console.log(pet);
      console.log(pets);
    } catch (error) {
      console.error(error);
    }
  };

  const deletePet = async (id) => {
    try {
      const res = await deletePetRequest(id);
      getPets();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PetsContext.Provider
      value={{
        createPet,
        getPets,
        getPet,
        updatePet,
        deletePet,
        pets,
      }}
    >
      {children}
    </PetsContext.Provider>
  );
}
