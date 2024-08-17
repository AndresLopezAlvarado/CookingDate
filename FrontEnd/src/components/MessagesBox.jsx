import { useRef, useEffect } from "react";
import { Avatar } from "@chakra-ui/react";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../pages/chatLogics";

const MessagesBox = ({ messages, user }) => {
  const messageContainerRef = useRef(null);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={messageContainerRef}
      className="flex-grow max-h-[calc(100vh-4rem)] pb-3 overflow-y-auto"
    >
      {messages &&
        messages.map((message, index) => (
          <div
            className={`flex ${
              isSameUser(messages, message, index) ? "mt-1" : "mt-4"
            } space-x-1 ${
              message.sender._id === user._id ? "justify-end" : "justify-start"
            } items-center ${
              isSameSenderMargin(messages, message, index) ? "ml-11" : "ml-0"
            }`}
            key={message._id}
          >
            {(isSameSender(messages, message, index, user._id) ||
              isLastMessage(messages, index, user._id)) && (
              <Avatar
                className="w-10 h-10"
                src={
                  message.sender.profilePicture
                    ? message.sender.profilePicture.url
                    : "/noProfilePhoto.png"
                }
                borderRadius={"100%"}
              />
            )}

            <span
              className={`${
                message.sender._id === user._id
                  ? "bg-[#FF9500] text-white rounded-tr-none"
                  : "bg-[#FF3B30] text-white rounded-tl-none"
              } px-4 py-2 rounded-md`}
            >
              {message.content}
            </span>
          </div>
        ))}
    </div>
  );
};

export default MessagesBox;
