import { Router } from "express";
import {
  createPet,
  getPets,
  editPet,
  getPet,
  deletePet,
} from "../controllers/petsController.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.post("/pets", authRequired, createPet);
router.get("/pets", authRequired, getPets);
router.put("/pets/:id", authRequired, editPet);
router.get("/pets/:id", authRequired, getPet);
router.delete("/pets/:id", authRequired, deletePet);

export default router;
