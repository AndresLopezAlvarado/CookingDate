import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getNotifications } from "../controllers/notificationsController.js";

const router = Router();

router.post("/", authRequired, getNotifications);

export default router;
