import Modal from "../Modal";
import SignUpForm from "./SignUpForm";

const SignUpModal = ({ isOpen, toggleModal }) => {
  return (
    <Modal isOpen={isOpen} onClose={toggleModal}>
      <SignUpForm toggleModal={toggleModal} />
    </Modal>
  );
};

export default SignUpModal;
