import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("/");

const Chat = ({ toggleModal }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = { body: message, from: "Me" };
    setMessages([...messages, newMessage]);
    socket.emit("message", message);
    setMessage("");
  };

  const receiveMessage = (message) => {
    setMessages((state) => [...state, message]);
  };

  useEffect(() => {
    socket.on("message", receiveMessage);

    return () => socket.off("message", receiveMessage);
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      <div className="w-full flex flex-col space-y-2">
        {messages.map((message, index) => (
          <p
            key={index}
            className={`${
              message.from === "Me"
                ? "bg-[#FFCC00] p-2 ml-auto rounded-md"
                : "bg-[#FF9500] p-2 mr-auto rounded-md"
            }`}
            style={{ overflowWrap: "break-word" }}
          >
            <span className="font-bold">{message.from}: </span>
            {message.body}
          </p>
        ))}
      </div>

      <form className="flex space-x-2" onSubmit={handleSubmit}>
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
