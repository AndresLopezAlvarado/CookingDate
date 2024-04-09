import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs-extra";
import User from "../models/UserModel.js";
import { TOKEN_SECRET } from "../config.js";
import { createAccessToken } from "../libs/jwt.js";
import { uploadImage, findImage, deleteImage } from "../libs/cloudinary.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: passwordHash });
    const userSaved = await newUser.save();

    const access_token = await createAccessToken({ id: userSaved._id });
    res.cookie("access_token", access_token, {
      sameSite: "none",
      secure: true,
      Partitioned: true,
    });

    res.json(userSaved);
  } catch (error) {
    if (error.code === 11000) {
      console.log({
        message: `The email ${email} is already in use`,
        errorMessage: error.message,
        arrayErrors: [`The email ${email} is already in use`],
      });
      res.status(500).json({
        message: `The email ${email} is already in use`,
        errorMessage: error.message,
        arrayErrors: [`The email ${email} is already in use`],
      });
    } else {
      console.log({
        message: "Something went wrong on register",
        errorMessage: error.message,
        // arrayErrors: error.errors.map((error) => error.message),
      });
      res.status(500).json({
        message: "Something went wrong on register",
        errorMessage: error.message,
        // arrayErrors: error.errors.map((error) => error.message),
      });
    }
  }
};

export const login = async (req, res) => {
  console.log("Estoy en login de authController.js (BackEnd)");
  console.log(req.body);
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound)
      return res.status(400).json({
        message: "User no found",
        errorMessage: "User no found",
        arrayErrors: ["User no found"],
      });

    const isPasswordMatch = await bcrypt.compare(password, userFound.password);
    if (!isPasswordMatch)
      return res.status(400).json({
        message: "Incorrect password",
        errorMessage: "Incorrect password",
        arrayErrors: ["Incorrect password"],
      });

    const access_token = await createAccessToken({ id: userFound._id });
    res.cookie("access_token", access_token, {
      sameSite: "none",
      secure: true,
      Partitioned: true,
    });

    res.json(userFound);
  } catch (error) {
    console.log({
      message: "Something went wrong on login",
      errorMessage: error.message,
      arrayErrors: error.errors.map((error) => error.message),
    });
    res.status(500).json({
      message: "Something went wrong on login",
      errorMessage: error.message,
      arrayErrors: error.errors.map((error) => error.message),
    });
  }
};

export const profile = async (req, res) => {
  try {
    const userFound = await User.findById(req.body.id);
    if (!userFound) {
      return res.status(400).json({
        message: "User no found. Something went wrong on profile (BackEnd)",
        errorMessage: error.response.data.message,
        arrayErrors: error.response.data.arrayErrors,
      });
    }

    return res.json({ userFound });
  } catch (error) {
    console.log({
      message: "Something went wrong on profile",
      errorMessage: error.response.data.message,
      arrayErrors: error.response.data.arrayErrors,
    });
    res.status(500).json({
      message: "Something went wrong on profile",
      errorMessage: error.response.data.message,
      arrayErrors: error.response.data.arrayErrors,
    });
  }
};

export const verifyToken = async (req, res) => {
  const { access_token } = req.cookies;
  if (!access_token) {
    return res.status(401).json({
      message:
        "Unauthorized, token no found (something went wrong on verifyToken)",
      errorMessage: error.response.data.message,
      arrayErrors: error.response.data.arrayErrors,
    });
  }

  jwt.verify(access_token, TOKEN_SECRET, async (err, user) => {
    if (err) {
      return res.status(401).json({
        message:
          "Unauthorized, token no match (something went wrong on verifyToken)",
        errorMessage: err.message,
      });
    }

    try {
      const userFound = await User.findById(user.id);
      if (!userFound) {
        return res.status(401).json({
          message:
            "Unauthorized, user no found (something went wrong on verifyToken)",
          errorMessage: error.response.data.message,
          arrayErrors: error.response.data.arrayErrors,
        });
      }

      return res.json(userFound);
    } catch (error) {
      console.log({
        message: "Something went wrong on profile",
        // errorMessage: error.response.data.message,
        arrayErrors: error.response.data.arrayErrors,
      });
      res.status(500).json({
        message: "Something went wrong on profile",
        errorMessage: error.response.data.message,
        arrayErrors: error.response.data.arrayErrors,
      });
    }
  });
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) return res.status(404).json({ message: "Users no found" });
    console.log(users);
    res.json(users);
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

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User no found" });

    res.json(user);
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



export const uploadPhotos = async (req, res) => {
  try {
    console.log("Estoy en uploadPhotos de authController.js");

    const images = {};

    const user = await User.findById(req.params.id);

    if (req.files) {
      for (const key in req.files) {
        const file = req.files[key];
        const nameFile = req.files[key].name.split(".");

        const findFile = await findImage(file.name);

        if (findFile.total_count === 0) {
          console.log("No está repetido");
          const result = await uploadImage(
            req.files[key].tempFilePath,
            req.files[key].name
          );

          images[nameFile[0]] = {
            url: result.secure_url,
            public_id: result.public_id,
            name: req.files[key].name,
            data: req.files[key].data,
            type: req.files[key].mimetype,
          };
        } else {
          user.images.forEach((value, key) => {
            if (value.name === findFile.resources[0].filename) {
              images[nameFile[0]] = {
                url: value.url,
                public_id: value.public_id,
                name: value.name,
                data: value.data,
                type: value.type,
              };
            }
          });
        }

        await fs.remove(req.files[key].tempFilePath);
      }
    }

    const userUpdated = await User.findByIdAndUpdate(
      req.params.id,
      { images: images },
      { new: true }
    );

    console.log(userUpdated.images);
    res.json(userUpdated);
  } catch (error) {
    console.log({
      message: "Something went wrong on uploadPhotos (BackEnd)",
      errorMessage: error.message,
    });
    res.status(500).json({
      message: "Something went wrong on uploadPhotos (BackEnd)",
      errorMessage: error.message,
    });
  }
};

export const deletePhoto = async (req, res) => {
  console.log("Estoy en deletePhoto de authController.js");
  try {
    const user = await User.findById(req.params.id);
    const delImage = await deleteImage(req.body.public_id);

    user.images.forEach((value, key) => {
      if (value.public_id === req.body.public_id) {
        user.images.delete(key);
      }
    });

    const userUpdated = await User.findByIdAndUpdate(req.params.id, user, {
      new: true,
    });
    
    console.log(userUpdated);
    res.json(userUpdated);
  } catch (error) {
    console.log({
      message: "Something went wrong on deletePhoto (BackEnd)",
      errorMessage: error.message,
    });
    res.status(500).json({
      message: "Something went wrong on deletePhoto (BackEnd)",
      errorMessage: error.message,
    });
  }
};
