import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import { usePeople } from "../contexts/PeopleContext";
import { ChatState } from "../contexts/ChatContext";
import { useNotifications } from "../contexts/NotificationsContext";
import { loadMessagesRequest, sendMessageRequest } from "../api/messages";
import Spinner from "../components/Spinner";

var selectedChatCompare;

const Chat = () => {
  const toast = useToast();
  const params = useParams();
  const { user } = useAuth();
  const { getPerson } = usePeople();
  const { selectedChat, loadChat, loadingChat, socket } = ChatState();
  const { notifications, setNotifications } = useNotifications();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();

    const newMessage = { body: message, from: user._id };

    try {
      const { data } = await sendMessageRequest(selectedChat._id, newMessage);

      setMessages([...messages, data]);
      socket.emit("new message", data);
      setMessage("");

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
    setMessages((state) => [...state, newMessageReceived]);
    socket.auth.serverOffset = serverOffset;

    if (
      !selectedChatCompare ||
      selectedChatCompare._id !== newMessageReceived.chat._id
    ) {
      console.log(notifications.includes(newMessageReceived));
      if (!notifications.includes(newMessageReceived)) {
        setNotifications([newMessageReceived, ...notifications]);
      }
    } else {
      setMessages([...messages, newMessageReceived]);
    }

    console.log({
      "Estoy en receiveMessage": {
        newMessageReceived: newMessageReceived,
        serverOffset: serverOffset,
        selectedChatCompare: selectedChatCompare,
        selectedChatCompare_id: selectedChatCompare._id,
        newMessageReceivedChatId: newMessageReceived.chat._id,
        messages: messages,
      },
    });
  };

  async function loadMessages() {
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
  }

  async function loadPerson() {
    try {
      const dataPerson = await getPerson(params.id);
      loadChat(user._id, dataPerson._id);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadPerson();
  }, []);

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
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));

    console.log({
      "Estoy en useEffect setup": {
        user: user,
      },
    });
  }, []);

  useEffect(() => {
    socket.on("receive message", receiveMessage);

    console.log({
      "Estoy en useEffect receive message": {
        messages: messages,
        notifications: notifications,
      },
    });

    return () => socket.off("receive message", receiveMessage);
  }, [messages]);

  return (
    <div className="min-h-screen mt-16 flex flex-col space-y-4">
      <div className="w-full h-full flex flex-col space-y-2">
        {loadingChat ? (
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
        <Link
          className="bg-[#FF9500] hover:bg-[#FFCC00] font-bold p-2 rounded-md"
          to="/people"
          onClick={() => {
            selectedChatCompare = null;
            console.log(selectedChatCompare);
          }}
        >
          Back
        </Link>

        <input
          className="bg-[#FFCC00] text-[#FF3B30] placeholder-orange-400 w-full p-2 rounded-md"
          type="text"
          placeholder="Write your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          type="submit"
          className="bg-[#FF9500] hover:bg-[#FFCC00] font-bold p-2 rounded-md"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
