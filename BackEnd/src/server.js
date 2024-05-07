import { Server } from "socket.io";
import app from "./app.js";
import { tengoQuePonerleNombre } from "./tengoQuePonerleNombre.js";

const io = new Server(app, {
  pingTimeout: 60000,
  cors: { origin: "*" },
  connectionStateRecovery: {},
});

io.on("connection", tengoQuePonerleNombre);
