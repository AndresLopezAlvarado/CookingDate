import Notification from "../models/NotificationModel.js";

export const getNotifications = async (req, res) => {
  try {
    const userId = req.params.userId;
    const notificaciones = await Notification.find({ userId });
    res.json(notificaciones);
  } catch (error) {
    console.error({
      message: "Something went wrong on getNotifications",
      errorMessage: error.message,
    });
    res.status(500).json({
      message: "Something went wrong on getNotifications",
      errorMessage: error.message,
    });
  }
};
