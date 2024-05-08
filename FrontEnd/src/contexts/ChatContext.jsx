import { createContext, useContext, useState } from "react";
import { useToast } from "@chakra-ui/react";
import io from "socket.io-client";
import { loadChatRequest } from "../api/chat";

const ChatContext = createContext();

export const ChatState = () => {
  return useContext(ChatContext);
};

const ENDPOINT = "http://localhost:3000";

const ChatProvider = ({ children }) => {
  const toast = useToast();

  const [loadingChat, setLoadingChat] = useState(false);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [notification, setNotification] = useState([]);
  const [socket, setSocket] = useState(
    io(ENDPOINT, { auth: { serverOffset: 0 } })
  );

  const loadChat = async (userId, personId) => {
    setLoadingChat(true);

    try {
      const { data } = await loadChatRequest(userId, personId);

      if (chats) {
        if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      }

      setSelectedChat(data);
      setLoadingChat(false);
    } catch (error) {
      console.log(error);

      toast({
        title: "Error fecthing the chat!",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <ChatContext.Provider
      value={{
        socket,
        loadChat,
        loadingChat,
        setLoadingChat,
        chats,
        setChats,
        selectedChat,
        setSelectedChat,
        notification,
        setNotification,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
