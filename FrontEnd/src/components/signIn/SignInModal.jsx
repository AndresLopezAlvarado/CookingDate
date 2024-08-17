import Modal from "../Modal";
import SignInForm from "./SignInForm";

const SignInModal = ({ isOpen, toggleModal }) => {
  return (
    <Modal isOpen={isOpen} onClose={toggleModal}>
      <SignInForm toggleModal={toggleModal} />
    </Modal>
  );
};

export default SignInModal;
