import User from "../models/UserModel.js";
import Chat from "../models/ChatModel.js";

export const loadChats = async (req, res) => {
  // verificar si tengo req.user._id
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("latestMessage")
      .sort({ updateAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "username profilePicture.url email",
        });

        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

export const loadChat = async (req, res) => {
  const { userId, personId } = req.body;
  // console.log({ "Estoy en loadChat": { userId: userId, personId: personId } });

  if (!personId) {
    console.log("personId param not sent with request");
    return res.sendStatus(400);
  }

  try {
    var isChat = await Chat.find({
      $and: [
        { users: { $elemMatch: { $eq: userId } } },
        { users: { $elemMatch: { $eq: personId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    // console.log({ "Estoy en loadChat": { isChat: isChat } });

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "username profilePicture.url email",
    });

    // console.log({ "Estoy en loadChat": { isChat: isChat } });

    if (isChat.length > 0) {
      // console.log({ "Estoy en loadChat": { isChat_0: isChat[0] } });
      res.send(isChat[0]);
    } else {
      var chatData = {
        chatName: "sender",
        users: [userId, personId],
      };

      // console.log({ "Estoy en loadChat": { chatData: chatData } });

      const createdChat = await Chat.create(chatData);

      // console.log({ "Estoy en loadChat": { createdChat: createdChat } });

      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );

      // console.log({ "Estoy en loadChat": { fullChat: fullChat } });

      res.status(200).send(fullChat);
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

////////////////////////////////

export const createGroupChat = async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please fill all the fields" });
  }

  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }

  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

export const renameGroup = async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    { chatName },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat not found");
  } else {
    res.json(updatedChat);
  }
};

export const removeFromGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    { $pull: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(404);
    throw new Error("Chat not found");
  } else {
    res.json(removed);
  }
};

export const addToGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  const added = await Chat.findByIdAndUpdate(
    chatId,
    { $push: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(404);
    throw new Error("Chat not found");
  } else {
    res.json(added);
  }
};
