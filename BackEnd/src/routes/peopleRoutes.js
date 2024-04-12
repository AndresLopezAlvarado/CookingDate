import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getPeople } from "../controllers/people.Controller.js";

const router = Router();

router.get("/people", authRequired, getPeople);

export default router;
