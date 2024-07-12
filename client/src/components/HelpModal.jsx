import React from "react";
import "../styles/HelpModal.css";

const HelpModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay_x">
      <div className="modal_x">
        <div className="modal-content_x">
          <div className="cards">
            <h2>Help Information</h2>
            <button className="cancel_button_2" onClick={onClose}>
              X
            </button>
          </div>
          <p>
            <span>Registration Process:</span> To register, fill in your
            personal details in Step 1, upload required images and bus details
            in Step 2, and provide departure and arrival information in Step 3.
            Ensure all fields are correctly filled out before moving to the next
            step.
          </p>
          <p>
            <span>File Upload:</span> Ensure that all uploaded images are in the
            correct format (JPEG/PNG) and that the ID images are clear and
            readable. Bus images should clearly show the bus and its
            registration number.
          </p>
          <p>
            <span>How To Book A bus: </span>
              Just go to the <span>route bus</span> section and find your route.then press the
              book icon next to the routine.if you want to use another route just
              expand the drop down and click your route.then it will navigate
              t0 you to enter the card.After enternig the card details, you
              will get a <span>reciept</span> and download that reciept and keep it with you.
            .
          </p>
          <p>
            <span>Additional Help:</span> For any additional assistance, please
            contact our support team at <span>sekara.dileeban@gmail.com</span>{" "}
            or call us at <span>(076) 756 6677</span>.
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
