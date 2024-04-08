import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { profilePicture } from "../controllers/profileController.js";

const router = Router();

router.put("/profile/:id", authRequired, profilePicture);

export default router;
