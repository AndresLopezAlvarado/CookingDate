import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { connectDB } from "./db.js";
import { FRONTEND_URL, PORT } from "./config.js";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import peopleRoutes from "./routes/peopleRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messagesRoutes from "./routes/messagesRoutes.js";
import notificationsRoutes from "./routes/notificationsRoutes.js";

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
app.use("/api/profile", profileRoutes);
app.use("/api/people", peopleRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messagesRoutes);
app.use("/api/notifications", notificationsRoutes);

export default app.listen(PORT, () =>
  console.log(`App listen to port ${PORT}`)
);
