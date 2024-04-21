import Modal from "../Modal";
import Notifications from "./Notifications";

const NotificationsModal = ({ isOpen, toggleModal, user }) => {
  return (
    <Modal isOpen={isOpen} onClose={toggleModal}>
      <Notifications userId={user._id} />
    </Modal>
  );
};

export default NotificationsModal;
