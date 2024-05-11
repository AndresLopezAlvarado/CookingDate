import User from "../models/UserModel.js";
import Chat from "../models/ChatModel.js";
import Message from "../models/MessageModel.js";

export const sendMessage = async (req, res) => {
  const { chatId, content } = req.body;

  // console.log({ "Estoy en sendMessage": { chatId: chatId, content: content } });

  if (!chatId || !content) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    chat: chatId,
    sender: content.from,
    content: content.body,
  };

  // console.log({ "Estoy en sendMessage": { newMessage: newMessage } });

  try {
    var message = await Message.create(newMessage);
    // console.log({ "Estoy en sendMessage": { message: message } });

    message = await message.populate("sender", "username profilePicture.url");
    // console.log({ "Estoy en sendMessage": { message: message } });

    message = await message.populate("chat");
    // console.log({ "Estoy en sendMessage": { message: message } });

    message = await User.populate(message, {
      path: "chat.users",
      select: "username profilePicture.url email",
    });
    // console.log({ "Estoy en sendMessage": { message: message } });

    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: message,
    });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

export const loadMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "username profilePicture.url email")
      .populate("chat");

    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};
