import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import authRoutes from "./routes/authRoutes.js";
import petsRoutes from "./routes/petsRoutes.js";
import { FRONTEND_URL } from "./config.js";

const app = express();

app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true, tempFileDir: "./upload" }));

app.use("/api", authRoutes);
app.use("/api", petsRoutes);

export default app;
