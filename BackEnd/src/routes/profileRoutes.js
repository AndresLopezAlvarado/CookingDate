import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  updateProfile,
  profilePicture,
  uploadPhotos,
  deletePhoto,
} from "../controllers/profileController.js";

const router = Router();

router.put("/profile/:id", authRequired, updateProfile);
router.put("/profile/profilePicture/:id", authRequired, profilePicture);
router.put("/profile/uploadPhotos/:id", authRequired, uploadPhotos);
router.post("/profile/deletePhoto/:id", authRequired, deletePhoto);

export default router;
