import axios from "./axios";

export const getPetsRequest = async () => axios.get("/pets");

export const createPetRequest = async (pet) => {
  console.log("Estoy en createPetRequest de pets.js");
  console.log(pet);
  const form = new FormData();
  console.log(form);

  for (let key in pet) form.append(key, pet[key]);
  console.log(form);
  console.log(form.get("image"));

  return await axios.post("/pets", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  // await axios.post("/pets", pet);
};

export const getPetRequest = async (id) => axios.get(`/pets/${id}`);

export const updatePetRequest = async (id, pet) => {
  console.log("Estoy en updatePetRequest de pets.js");
  console.log(pet);
  const form = new FormData();
  console.log(form);

  for (let key in pet) form.append(key, pet[key]);
  console.log(form);
  console.log(form.get("image"));

  return await axios.put(`/pets/${id}`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deletePetRequest = async (id) => axios.delete(`/pets/${id}`);
