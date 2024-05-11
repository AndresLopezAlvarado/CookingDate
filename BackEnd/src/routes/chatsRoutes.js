import { Router } from "express";
import {
  loadChats,
  loadChat,
  /////////////////
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
} from "../controllers/chatController.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get("/", authRequired, loadChats);
router.post("/", authRequired, loadChat);

////////////////////////////////////////

router.post("/group", authRequired, createGroupChat);
router.put("/rename", authRequired, renameGroup);
router.put("/groupRemove", authRequired, removeFromGroup);
router.put("/groupAdd", authRequired, addToGroup);

export default router;
