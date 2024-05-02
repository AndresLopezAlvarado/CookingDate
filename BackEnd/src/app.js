import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import peopleRoutes from "./routes/peopleRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messagesRoutes from "./routes/messagesRoutes.js";
import notificationsRoutes from "./routes/notificationsRoutes.js";
import { FRONTEND_URL } from "./config.js";
import { connectDB } from "./db.js";
import { PORT } from "./config.js";

connectDB();

const app = express();

// app.use(cors({ origin: "*", credentials: true }));
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
app.use("/api/chat", chatRoutes);
app.use("/api/message", messagesRoutes);
app.use("/api", notificationsRoutes);

const server = app.listen(PORT, () =>
  console.log(`App listen to port ${PORT}`)
);

export default server;
