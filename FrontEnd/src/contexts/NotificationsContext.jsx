import { createContext, useContext, useState } from "react";
import { getNotificationsRequest } from "../api/notifications.js";

const NotificationsContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationsContext);

  if (!context)
    throw new Error(
      "useNotifications must be used within a NotificationsProvider"
    );

  return context;
};

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(null);

  const getNotifications = async (userId) => {
    try {
      const res = await getNotificationsRequest(userId);
      setNotifications(res.data);
    } catch (error) {
      console.error({
        message: "Something went wrong on getNotifications",
        // errorMessage: error.response.data.message,
        // arrayErrors: error.response.data.arrayErrors,
      });
    }
  };

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        setNotifications,
        getNotifications,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export default NotificationsContext;
