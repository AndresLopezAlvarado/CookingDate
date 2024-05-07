import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import { TOKEN_SECRET } from "../config.js";
import { createAccessToken } from "../libs/jwt.js";

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
      console.error({
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
      console.error({
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
    console.error({
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

// export const logout = (req, res) => {
//   res.cookie("access_token", "", {
//     maxAge: 1,
//     sameSite: "none",
//     secure: true,
//     Partitioned: true,
//   });
//   res.redirect("/");
// };

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
    console.error({
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
      console.error({
        message: "Something went wrong on profile",
        // errorMessage: error.response.data.message,
        // arrayErrors: error.response.data.arrayErrors,
      });
      res.status(500).json({
        message: "Something went wrong on profile",
        // errorMessage: error.response.data.message,
        arrayErrors: error.response.data.arrayErrors,
      });
    }
  });
};
