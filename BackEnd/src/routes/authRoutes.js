import { Router } from "express";
import {
  register,
  login,
  profile,
  verifyToken,
  getUser,
  getUsers,
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

export default router;
