import Modal from "../Modal";
import Chat from "./Chat";

const ChatModal = ({ isOpen, toggleModal, person }) => {
  return (
    <Modal isOpen={isOpen} onClose={toggleModal}>
      <Chat person={person}/>
    </Modal>
  );
};

export default ChatModal;
