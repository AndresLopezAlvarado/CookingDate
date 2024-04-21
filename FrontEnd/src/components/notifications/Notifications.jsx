// NotificacionesPanel.js
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useNotifications } from "../../contexts/NotificationsContext.jsx";

const socket = io("/");
// const socket = io("http://localhost:3001");

const Notifications = ({ userId, toggleModal }) => {
  const { notifications, setNotifications, getNotifications } =
    useNotifications();

  async function loadNotifications() {
    await getNotifications(userId);
  }

  useEffect(() => {
    loadNotifications();

    socket.on("notification", (newNotification) => {
      setNotifications((prevNotifications) => [
        newNotification,
        ...prevNotifications,
      ]);
    });

    return () => {
      socket.off("notification");
    };
  }, [userId]);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications
          ? notifications.map((notification) => (
              <li key={notification._id}>
                {notification.message}{" "}
                {notification.read ? "(Read)" : "(No read)"}
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default Notifications;
