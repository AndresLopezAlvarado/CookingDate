import { Router } from "express";
import {
  loadChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
} from "../controllers/chatController.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.post("/", authRequired, loadChat);
router.get("/", authRequired, fetchChats);
router.post("/group", authRequired, createGroupChat);
router.put("/rename", authRequired, renameGroup);
router.put("/groupRemove", authRequired, removeFromGroup);
router.put("/groupAdd", authRequired, addToGroup);

export default router;
