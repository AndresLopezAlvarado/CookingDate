import Message from "../models/MessageModel.js";
import Chat from "../models/ChatModel.js";
import User from "../models/UserModel.js";

export const sendMessage = async (req, res) => {
  const { chatId, content } = req.body;

  if (!chatId || !content) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: content.from,
    content: content.body,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);
    message = await message.populate("sender", "username profilePicture.url");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "username profilePicture.url email",
    });

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

    console.log(messages);

    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};
