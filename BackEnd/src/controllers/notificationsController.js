import Notification from "../models/NotificationModel.js";

export const getNotifications = async (req, res) => {
  const { userId } = req.body;

  try {
    // const userId = req.params.userId;
    const notifications = await Notification.find({ userId });

    res.json(notifications);
  } catch (error) {
    console.error({
      message: "Something went wrong on get notifications (getNotifications)",
      error: error,
    });

    res.status(500).json({
      message: "Something went wrong on get notifications (getNotifications)",
      error: error,
    });

    throw new Error({
      message: "Something went wrong on get notifications (getNotifications)",
      error: error,
    });
  }
};
