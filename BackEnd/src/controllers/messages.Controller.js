import User from "../models/UserModel.js";
import Chat from "../models/ChatModel.js";
import Message from "../models/MessageModel.js";

export const sendMessage = async (req, res) => {
  const { chatId, content } = req.body;

  // console.log({ "Estoy en sendMessage": { chatId: chatId, content: content } });

  if (!chatId || !content) {
    console.log({ message: "Invalid data passed into request (sendMessage)" });
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
    console.error({
      message: "Something went wrong on send message (sendMessage)",
      error: error,
    });

    res.status(500).json({
      message: "Something went wrong on send message (sendMessage)",
      error: error,
    });

    throw new Error({
      message: "Something went wrong on send message (sendMessage)",
      error: error,
    });
  }
};

export const loadMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "username profilePicture.url email")
      .populate("chat");

    res.json(messages);
  } catch (error) {
    console.error({
      message: "Something went wrong on load messages (loadMessages)",
      error: error,
    });

    res.status(500).json({
      message: "Something went wrong on load messages (loadMessages)",
      error: error,
    });

    throw new Error({
      message: "Something went wrong on load messages (loadMessages)",
      error: error,
    });
  }
};
