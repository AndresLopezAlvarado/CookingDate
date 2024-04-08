import { uploadImage, deleteImage } from "../libs/cloudinary.js";
import fs from "fs-extra";
import User from "../models/UserModel.js";

export const profilePicture = async (req, res) => {
  try {
    console.log("Estoy en profilePicture de profileController.js");

    let image = null;
    const user = await User.findById(req.params.id);

    if (user.image.public_id) {
      await deleteImage(user.image.public_id);
    }

    if (req.files.photo) {
      const result = await uploadImage(req.files.photo.tempFilePath);
      image = { url: result.secure_url, public_id: result.public_id };
      await fs.remove(req.files.photo.tempFilePath);
    }

    const userUpdated = await User.findByIdAndUpdate(
      req.params.id,
      { image },
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
