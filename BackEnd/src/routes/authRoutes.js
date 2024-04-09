import { Router } from "express";
import {
  register,
  login,
  profile,
  verifyToken,
  getUser,
  getUsers,
  uploadPhotos,
  deletePhoto,
} from "../controllers/authController.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { registerSchema, loginSchema } from "../schemas/authSchema.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.get("/profile", authRequired, profile);
router.get("/verify", verifyToken);
router.get("/users", authRequired, getUsers);
router.get("/users/:id", authRequired, getUser);
// router.put("/profile/:id", authRequired, uploadPhotos);
// router.post("/profile/:id", authRequired, deletePhoto);

export default router;
