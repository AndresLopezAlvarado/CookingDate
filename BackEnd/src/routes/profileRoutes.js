import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  updateProfile,
  profilePicture,
  uploadPhotos,
  deletePhoto,
  profile,
} from "../controllers/profileController.js";

const router = Router();

router.get("/", authRequired, profile);
router.put("/:id", authRequired, updateProfile);
router.put("/profilePicture/:id", authRequired, profilePicture);
router.put("/uploadPhotos/:id", authRequired, uploadPhotos);
router.post("/deletePhoto/:id", authRequired, deletePhoto);

export default router;
