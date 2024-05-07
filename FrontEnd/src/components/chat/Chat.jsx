import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useToast } from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext";
import { ChatState } from "../../contexts/ChatContext";
import { loadMessagesRequest, sendMessageRequest } from "../../api/messages";
import Spinner from "../Spinner";

var socket, selectedChatCompare;
const ENDPOINT = "http://localhost:3000";
socket = io(ENDPOINT, { auth: { serverOffset: 0 } });

const Chat = ({ person }) => {
  const toast = useToast();
  const { user } = useAuth();
  const { selectedChat, loadChat, loadingChat } = ChatState();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();

    const newMessage = { body: message, from: user._id };

    try {
      setLoading(true);

      const { data } = await sendMessageRequest(selectedChat._id, newMessage);

      setMessages([...messages, data]);
      socket.emit("new message", data);
      setMessage("");
      setLoading(false);

      console.log({
        "Estoy en sendMessage": {
          e: e,
          newMessage: newMessage,
          selectedChat_id: selectedChat._id,
          messages: messages,
        },
      });
    } catch (error) {
      console.log(error);

      toast({
        title: "Error ocurred!",
        description: "Failed to send the message",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const receiveMessage = (newMessageReceived, serverOffset) => {
    setLoading(true);
    setMessages((state) => [...state, newMessageReceived]);
    socket.auth.serverOffset = serverOffset;

    if (
      !selectedChatCompare ||
      selectedChatCompare._id !== newMessageReceived.chat._id
    ) {
      // if (!notification.includes(newMessageReceived)) {
      //   setNotification([newMessageReceived, ...notification]);
      // }
    } else {
      setLoading(true);
      setMessages([...messages, newMessageReceived]);
      setLoading(false);
    }

    console.log({
      "Estoy en receiveMessage": {
        newMessageReceived: newMessageReceived,
        serverOffset: serverOffset,
        selectedChatCompare_id: selectedChatCompare._id,
        messages: messages,
      },
    });

    setLoading(false);
  };

  const loadMessages = async () => {
    setLoading(true);

    if (!selectedChat) {
      return;
    }

    try {
      const { data } = await loadMessagesRequest(selectedChat._id);

      setMessages(data);

      socket.emit("join chat", selectedChat._id);

      console.log({
        "Estoy en loadMessages": {
          selectedChat_id: selectedChat ? selectedChat._id : "",
          data: data,
        },
      });

      setLoading(false);
    } catch (error) {
      console.log(error);

      toast({
        title: "Error ocurred!",
        description: "Failed to load the messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    console.log({
      "Estoy en useEffect loadMessages": {
        selectedChatCompare: selectedChatCompare,
        selectedChat: selectedChat,
      },
    });

    loadMessages();

    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    console.log({
      "Estoy en useEffect loadChat": {
        personId: person._id,
      },
    });

    loadChat(user._id, person._id);
  }, []);

  useEffect(() => {
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));

    console.log({
      "Estoy en useEffect setup": {
        ENDPOINT: ENDPOINT,
        user: user,
      },
    });
  }, []);

  useEffect(() => {
    socket.on("receive message", receiveMessage);

    console.log({
      "Estoy en useEffect receive message": {
        messages: messages,
      },
    });

    return () => socket.off("receive message", receiveMessage);
  }, [messages]);

  return (
    <div className="flex flex-col space-y-4">
      <div className="w-full flex flex-col space-y-2">
        {loadingChat ? (
          <Spinner />
        ) : loading ? (
          <Spinner />
        ) : (
          messages.map((message, index) => (
            <p
              key={index}
              className={`${
                message.sender._id === user._id
                  ? "bg-[#FFCC00] p-2 ml-auto rounded-md"
                  : "bg-[#FF9500] p-2 mr-auto rounded-md"
              }`}
              style={{ overflowWrap: "break-word" }}
            >
              <span className="font-bold">
                {`${
                  message.sender._id === user._id
                    ? "Me"
                    : message.sender.username
                }`}
                :{" "}
              </span>
              {message.content}
            </p>
          ))
        )}
      </div>

      <form className="flex space-x-2" onSubmit={sendMessage}>
        <input
          className="bg-[#FFCC00] text-[#FF3B30] placeholder-orange-400 w-full p-2 rounded-md"
          type="text"
          placeholder="Write your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button className="bg-[#FF9500] hover:bg-[#FFCC00] font-bold p-2 rounded-md">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;