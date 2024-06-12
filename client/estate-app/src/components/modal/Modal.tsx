import "./modal.scss";
import {} from "react";

interface ModalProps {
  setIsOpen: (isOpen: boolean) => void;
}

const Modal = (props: ModalProps) => {
  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={() => props.setIsOpen(false)}>
          &times;
        </span>
        <p>Some text modal...</p>
      </div>
    </div>
  );
};

export default Modal;
