import Modal from "../Modal";
import Chat from "./Chat";

const ChatModal = ({ isOpen, toggleModal }) => {
  return (
    <Modal isOpen={isOpen} onClose={toggleModal}>
      <Chat />
    </Modal>
  );
};

export default ChatModal;
