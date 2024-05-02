import { Router } from "express";
import {
  sendMessage,
  loadMessages,
} from "../controllers/messages.Controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get("/:chatId", authRequired, loadMessages);
router.post("/", authRequired, sendMessage);

export default router;
