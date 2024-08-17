import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import { TOKEN_SECRET } from "../config.js";
import { createAccessToken } from "../libs/jwt.js";

export const signUp = async (req, res) => {
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
    console.error({
      message: "Something went wrong on sign up (signUp)",
      error: error,
    });

    res.status(500).json({
      message: "Something went wrong on sign up (signUp)",
      error: error,
    });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });

    if (!userFound)
      return res.status(400).json({ message: "User no found (signIn)" });

    const isPasswordMatch = await bcrypt.compare(password, userFound.password);

    if (!isPasswordMatch)
      return res.status(400).json({ message: "Incorrect password (signIn)" });

    const access_token = await createAccessToken({ id: userFound._id });

    res.cookie("access_token", access_token, {
      sameSite: "none",
      secure: true,
      Partitioned: true,
    });

    res.json(userFound);
  } catch (error) {
    console.error({
      message: "Something went wrong on sign in (signIn)",
      error: error,
    });

    res.status(500).json({
      message: "Something went wrong on sign in (signIn)",
      error: error,
    });
  }
};

export const verifyToken = async (req, res) => {
  const { access_token } = req.cookies;

  if (!access_token)
    return res
      .status(401)
      .json({ message: "Unauthorized, token no found (verifyToken)" });

  jwt.verify(access_token, TOKEN_SECRET, async (err, user) => {
    if (err)
      return res.status(401).json({
        message: "Unauthorized, token no match (verifyToken)",
        error: err,
      });

    try {
      const userFound = await User.findById(user.id);

      if (!userFound)
        return res
          .status(401)
          .json({ message: "Unauthorized, user no found (verifyToken)" });

      res.json(userFound);
    } catch (error) {
      console.error({
        message: "Something went wrong on verify token (verifyToken)",
        error: error,
      });

      res.status(500).json({
        message: "Something went wrong on verify token (verifyToken)",
        error: error,
      });
    }
  });
};
