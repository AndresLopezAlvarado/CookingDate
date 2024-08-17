import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useNotifications } from "../../contexts/NotificationsContext.jsx";

var socket;
const ENDPOINT = "http://localhost:3000";
socket = io(ENDPOINT, { auth: { serverOffset: 0 } });

const Notifications = ({ userId, toggleModal }) => {
  const { notifications, setNotifications, getNotifications } =
    useNotifications();

  async function loadNotifications() {
    try {
      await getNotifications(userId);
    } catch (error) {
      throw new Error(error);
    }
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
