import { Server as SocketServer } from "socket.io";
import server from "./app.js";
import { newMessage, allMessages } from "./controllers/socketController.js";
import MessageModel from "./models/MessageModel.js";
const io = new SocketServer(server, {
  pingTimeout: 60000,
  cors: { origin: "*" },
});

io.on("connection", async (socket) => {
  console.log("Connected to socket.io");

  // if (!socket.recovered) {
  //   try {
  //     console.log(socket.data);
  //     // const messages = await MessageModel.find({ chat: req.params.chatId })
  //     //   .populate("sender", "username profilePicture.url email")
  //     //   .populate("chat");

  //     // console.log(messages);
  //     // res.json(messages);
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error(error.message);
  //   }

  //   // let messagesSaved = await allMessages();
  //   // messagesSaved.forEach((message) =>
  //   //   socket.emit("message received", {
  //   //     body: message.message,
  //   //     from: message._id.toString(),
  //   //   })
  //   // );
  // }

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    // console.log("User joined room: " + room);
  });

  socket.on("typing", (room) => {
    socket.in(room).emit("typing");
  });

  socket.on("stop typing", (room) => {
    socket.in(room).emit("stop typing");
  });

  socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageReceived.sender._id) return;

      socket.in(user._id).emit("receive message", newMessageReceived);
    });
  });

  socket.off("setup", () => {
    console.log("User disconnected!");
    socket.leave(userData._id);
  });
});
