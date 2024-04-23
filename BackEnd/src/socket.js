import app from "./app.js";
import http from "http";
import { Server as SocketServer } from "socket.io";
import { newMessage, allMessages } from "./controllers/socketController.js";

const server = http.createServer(app);
const io = new SocketServer(server, { connectionStateRecovery: {} });

io.on("connection", async (socket) => {
  console.log("Connected client");

  socket.on("message", async (body) => {
    let messageSaved = await newMessage(socket.id, body);
    // socket.broadcast.emit("message", { body, from: socket.id });
    socket.broadcast.emit("message", {
      body: messageSaved.message,
      from: messageSaved._id.toString(),
    });
    // io.emit("message", {
    //   body: messageSaved.message,
    //   from: messageSaved._id.toString(),
    // });
    console.log(messageSaved);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected client");
  });

  if (!socket.recovered) {
    let messagesSaved = await allMessages();
    messagesSaved.forEach((message) =>
      socket.broadcast.emit("message", {
        body: message.message,
        from: message._id.toString(),
      })
    );
  }
});

export default server;
