import fs from "fs-extra";
import User from "../models/UserModel.js";
import { uploadImage, deleteImage } from "../libs/cloudinary.js";

export const profilePicture = async (req, res) => {
  try {
    let photo = null;
    const user = await User.findById(req.params.id);

    if (user.profilePicture.public_id) {
      await deleteImage(user.profilePicture.public_id);
    }
    if (req.files.profilePicture) {
      const result = await uploadImage(req.files.profilePicture.tempFilePath);
      photo = { url: result.secure_url, public_id: result.public_id };
      await fs.remove(req.files.profilePicture.tempFilePath);
    }

    const userUpdated = await User.findByIdAndUpdate(
      req.params.id,
      { profilePicture: photo },
      { new: true }
    );

    console.log(userUpdated);
    res.json(userUpdated);
  } catch (error) {
    console.error({
      message: "Something went wrong on profilePicture (BackEnd)",
      errorMessage: error.message,
    });
    res.status(500).json({
      message: "Something went wrong on profilePicture (BackEnd)",
      errorMessage: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { username, birthdate, gender, country, dietaryPreferences } =
      req.body;

    const userUpdated = await User.findByIdAndUpdate(
      req.params.id,
      { username, birthdate, gender, country, dietaryPreferences },
      { new: true }
    );

    console.log(userUpdated);
    res.json(userUpdated);
  } catch (error) {
    console.log({
      message: "Something went wrong on editUser (BackEnd)",
      errorMessage: error.message,
    });
    res.status(500).json({
      message: "Something went wrong on editUser (BackEnd)",
      errorMessage: error.message,
    });
  }
};
