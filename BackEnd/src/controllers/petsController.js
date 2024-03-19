import Pet from "../models/PetModel.js";
import { uploadImage } from "../libs/cloudinary.js";
import fs from "fs-extra";

export const createPet = async (req, res) => {
  try {
    console.log("Estoy en createPet (BackEnd)");
    console.log(req.body);
    const { name, age, breed } = req.body;
    let image = null;

    console.log(req.files.image);
    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      console.log(result);
      image = { url: result.secure_url, public_id: result.public_id };
      console.log(image);
      console.log(req.files.image.tempFilePath);
      const resRemove = await fs.remove(req.files.image.tempFilePath);
      console.log(resRemove);
    }

    console.log(req.user.id);
    console.log(req.body.user);
    const newPet = new Pet({ name, age, breed, image, user: req.user.id });
    console.log(newPet);

    console.log("Estoy en save (BackEnd)");
    const savedPet = await newPet.save();

    console.log(savedPet);
    res.json(savedPet);
  } catch (error) {
    console.log({
      message: "Something went wrong on createPet (BackEnd)",
      errorMessage: error.message,
    });
    res.status(500).json({
      message: "Something went wrong on createPet (BackEnd)",
      errorMessage: error.message,
    });
  }
};

export const getPets = async (req, res) => {
  try {
    const pets = await Pet.find({ user: req.user.id }).populate("user");
    res.json(pets);
  } catch (error) {
    console.log({
      message: "Something went wrong on getPets (BackEnd)",
      errorMessage: error.message,
    });
    res.status(500).json({
      message: "Something went wrong on getPets (BackEnd)",
      errorMessage: error.message,
    });
  }
};

export const editPet = async (req, res) => {
  try {
    console.log("Estoy en editPet (BackEnd)");
    console.log(req.body);
    const { name, age, breed } = req.body;
    let image = null;

    console.log(req.files.image);
    if (req.files?.image) {
      console.log("Estoy en uploadImage (BackEnd)");
      const result = await uploadImage(req.files.image.tempFilePath);
      console.log(result);
      image = { url: result.secure_url, public_id: result.public_id };
      console.log(image);
      console.log(req.files.image.tempFilePath);
      const resRemove = await fs.remove(req.files.image.tempFilePath);
      console.log(resRemove);
    }

    console.log("Estoy en findByIdAndUpdate (BackEnd)");
    console.log(req.params.id);
    const pet = await Pet.findByIdAndUpdate(
      req.params.id,
      { name, age, breed, image },
      {
        new: true,
      }
    );

    console.log(pet);
    res.json(pet);
  } catch (error) {
    console.log({
      message: "Something went wrong on editPet (BackEnd)",
      errorMessage: error.message,
    });
    res.status(500).json({
      message: "Something went wrong on editPet (BackEnd)",
      errorMessage: error.message,
    });
  }
};

export const getPet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).populate("user");
    if (!pet) return res.status(404).json({ message: "Pet no found" });

    res.json(pet);
  } catch (error) {
    console.log({
      message: "Something went wrong on getPet (BackEnd)",
      errorMessage: error.message,
    });
    res.status(500).json({
      message: "Something went wrong on getPet (BackEnd)",
      errorMessage: error.message,
    });
  }
};

export const deletePet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (!pet) return res.status(404).json({ message: "Pet no found" });
    return res.sendStatus(204);
  } catch (error) {
    console.log({
      message: "Something went wrong on deletePet (BackEnd)",
      errorMessage: error.message,
    });
    res.status(500).json({
      message: "Something went wrong on deletePet (BackEnd)",
      errorMessage: error.message,
    });
  }
};
