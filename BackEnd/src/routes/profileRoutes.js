import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  profilePicture,
  updateProfile,
} from "../controllers/profileController.js";

const router = Router();

router.put("/profile/profilePicture/:id", authRequired, profilePicture);
router.put("/profile/:id", authRequired, updateProfile);

export default router;
