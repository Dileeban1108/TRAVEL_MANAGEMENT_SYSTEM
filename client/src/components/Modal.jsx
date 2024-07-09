import React from "react";
import "../styles/modal.css"; 

const Modal = ({ children }) => {
  return (
    <div className="modal">
      <div className="modal-content_2">
        {children}
      </div>
    </div>
  );
};

export default Modal;
