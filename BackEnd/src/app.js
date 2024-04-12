import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import peopleRoutes from "./routes/peopleRoutes.js";
import { FRONTEND_URL } from "./config.js";

const app = express();

app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./upload",
    createParentPath: true,
  })
);

app.use("/api", authRoutes);
app.use("/api", profileRoutes);
app.use("/api", peopleRoutes);

export default app;
