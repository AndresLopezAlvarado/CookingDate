import { Server as SocketServer } from "socket.io";
import app from "./app.js";
import { tengoQuePonerleNombre } from "./tengoQuePonerleNombre.js";

const io = new SocketServer(app, {
  pingTimeout: 60000,
  cors: { origin: "*" },
});

io.on("connection", tengoQuePonerleNombre);
