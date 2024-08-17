import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { CiMenuKebab } from "react-icons/ci";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useAuth } from "../contexts/AuthContext";
import { usePeople } from "../contexts/PeopleContext";
import { useChat } from "../contexts/ChatContext";
import { useNotifications } from "../contexts/NotificationsContext";
import { loadMessagesRequest, sendMessageRequest } from "../api/messages";
import MessagesBox from "../components/MessagesBox";

var selectedChatCompare;

const Chat = () => {
  const toast = useToast();
  const params = useParams();
  const { user } = useAuth();
  const { person, getPerson } = usePeople();
  const { selectedChat, loadChat, loadingChat, socket } = useChat();
  const { notifications, setNotifications } = useNotifications();

  const [newMessage, setNewMessage] = useState({ from: user, body: "" });
  const [messages, setMessages] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);

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
      toast({
        title: "Error ocurred!",
        description: "Failed to load the messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      throw new Error(error);
    }
  }

  const sendMessage = async (event) => {
    event.preventDefault();
    console.log(newMessage);

    try {
      const { data } = await sendMessageRequest(selectedChat._id, newMessage);

      console.log({
        "Estoy en sendMessage": { data: data },
      });

      setNewMessage({ from: user, body: "" });
      setMessages([...messages, data]);
      socket.emit("new message", data);
    } catch (error) {
      toast({
        title: "Error ocurred!",
        description: "Failed to send the message",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      throw new Error(error);
    }
  };

  const receiveMessage = (newMessageReceived, serverOffset) => {
    setMessages((state) => [...state, newMessageReceived]);
    socket.auth.serverOffset = serverOffset;

    if (
      !selectedChatCompare ||
      selectedChatCompare._id !== newMessageReceived.chat._id
    ) {
      var x = notifications.includes(newMessageReceived);
      console.log(x);

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
        // selectedChatCompare_id: selectedChatCompare._id,
        newMessageReceivedChatId: newMessageReceived.chat._id,
        messages: messages,
      },
    });
  };

  useEffect(() => {
    console.log("Estoy en useEffect - loadChat");

    getPerson(params.id);

    socket.emit("setup", user);

    socket.on("connected", () => {
      setSocketConnected(true);

      if (socket.recovered) {
        // any event missed during the disconnection period will be received now
        console.log({
          "Estoy en useEffect - loadChat: recovered?": {
            socketRecovered: socket.recovered,
          },
        });
      } else {
        // new or unrecoverable session
      }

      // setTimeout(() => {
      //   if (socket.io.engine) {
      //     socket.io.engine.close();
      //   }
      // }, 10000);
    });

    loadChat(user._id, params.id);
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
    socket.on("receive message", receiveMessage);

    console.log({
      "Estoy en useEffect receive message": {
        messages: messages,
        notifications: notifications,
      },
    });

    // return () => socket.off("receive message", receiveMessage);
  }, [messages]);

  return (
    <div className="mt-16 w-full min-h-screen flex flex-col">
      <div className="flex justify-between items-center text-center">
        <Link
          to={`/people/${params.id}`}
          onClick={(selectedChatCompare = null)}
        >
          <IoMdArrowRoundBack className="text-3xl" />
        </Link>

        {person && (
          <div className="flex space-x-2 items-center">
            <img
              alt="Profile photo"
              src={
                person.profilePicture
                  ? person.profilePicture.url
                  : "/noProfilePhoto.png"
              }
              className="w-10 h-10 rounded-full"
            />

            <h1 className="text-3xl font-bold">{person.username}</h1>
          </div>
        )}

        <CiMenuKebab className="text-3xl" />
      </div>

      <MessagesBox user={user} messages={messages} />

      <form className="flex space-x-2" onSubmit={sendMessage}>
        <input
          className="bg-[#FFCC00] text-[#FF3B30] placeholder-orange-400 w-full p-2 rounded-md"
          type="text"
          placeholder="Send a message"
          value={newMessage.body}
          onChange={(e) => setNewMessage({ from: user, body: e.target.value })}
        />

        <button className="bg-[#FF9500] hover:bg-[#FFCC00] font-bold p-2 rounded-md">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
