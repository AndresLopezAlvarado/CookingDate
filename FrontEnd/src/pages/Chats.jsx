import { useEffect } from "react";
import Spinner from "../components/Spinner";
import { useChat } from "../contexts/ChatContext";

const Chats = () => {
  const { chats, loadChats } = useChat();

  useEffect(() => {
    loadChats();
  }, []);

  console.log(chats);

  return (
    <div className="mt-16 min-h-screen flex flex-col justify-between">
      {chats ? (
        chats.map((chat) => (
          <button
            key={chat._id}
            // onClick={() => setSelectedChat(chat)}
          >
            {chat.chatName}
          </button>
        ))
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Chats;
