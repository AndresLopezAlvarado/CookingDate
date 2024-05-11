import Notification from "../models/NotificationModel.js";

export const getNotifications = async (req, res) => {
  const { userId } = req.body;

  try {
    // const userId = req.params.userId;
    const notifications = await Notification.find({ userId });

    res.json(notifications);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};
