import Message from "../models/MessageModel.js";

export const newMessage = async (userId, message) => {
  try {
    const newMessage = new Message({ userId, message });
    const messageSaved = await newMessage.save();
    return messageSaved;
  } catch (error) {
    console.error(error);
  }
};

export const allMessages = async () => {
  try {
    const allMessages = await Message.find();
    return allMessages;
  } catch (error) {
    console.error(error);
  }
};
