import { createContext, useContext, useState } from "react";
import { useToast } from "@chakra-ui/react";
import io from "socket.io-client";
import { loadChatRequest, loadChatsRequest } from "../api/chats";

const ChatContext = createContext();

export const useChat = () => {
  return useContext(ChatContext);
};

const ENDPOINT = "http://localhost:3000";

const ChatProvider = ({ children }) => {
  const toast = useToast();

  const [loadingChat, setLoadingChat] = useState(false);
  const [chats, setChats] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [notification, setNotification] = useState([]);
  const [socket, setSocket] = useState(
    io(ENDPOINT, {
      auth: { serverOffset: 0 },
      reconnectionDelay: 10000,
      reconnectionDelayMax: 10000,
    })
  );

  const loadChat = async (userId, personId) => {
    setLoadingChat(true);

    try {
      const { data } = await loadChatRequest(userId, personId);

      if (chats) {
        if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      }

      console.log({
        "Estoy en loadChat": {
          userId: userId,
          personId: personId,
          data: data,
          chats: chats,
          // c_id: c._id,
          data_id: data._id,
        },
      });

      setSelectedChat(data);
      setLoadingChat(false);
    } catch (error) {
      console.error(error);

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

  const loadChats = async () => {
    try {
      const { data } = await loadChatsRequest();

      console.log({
        "Estoy en loadChats": {
          data: data,
        },
      });

      setChats(data);
    } catch (error) {
      console.error(error);

      toast({
        title: "Error fecthing the chats!",
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
        loadChats,
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
