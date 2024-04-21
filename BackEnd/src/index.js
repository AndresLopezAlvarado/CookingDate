import { connectDB } from "./db.js";
import app from "./app.js";
import http from "http";
import { Server as SocketServer } from "socket.io";
import { PORT } from "./config.js";

connectDB();

const server = http.createServer(app);
const io = new SocketServer(server);

io.on("connection", (socket) => {
  socket.on("message", (body) => {
    socket.broadcast.emit("message", { body, from: socket.id.slice(6) });
  });
});

server.listen(PORT, () => console.log(`App listen to port ${PORT}`));
