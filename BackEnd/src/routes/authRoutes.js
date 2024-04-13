import { Router } from "express";
import {
  register,
  login,
  // logout,
  profile,
  verifyToken,
} from "../controllers/authController.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { registerSchema, loginSchema } from "../schemas/authSchema.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.get("/profile", authRequired, profile);
// router.get("/logout", logout);
router.get("/verify", verifyToken);

export default router;
