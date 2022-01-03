/**
 * This component is used for showing the toast message
 */

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Toast } from "react-bootstrap";
import "./style.css";

const AppNotifications = ({ closeToast, visible, isSuccess, message, }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(visible);
  }, [visible]);

  const showHideFunc = () => {
    setShow(false);
    closeToast(false, "");
  };

  return (
    /**
     * We're showing the message body error/succes based on props which passed from action
     */

    <Toast
      className={`toastMessage ${show && (isSuccess ? "success" : "failed")}`}
      show={show}
      delay={5000}
      onClose={showHideFunc}
      autohide
    >
      <Toast.Body>
        {/* Toast button */}
        <button className="btn-icon" onClick={showHideFunc}>
          <span className="apIcon-cross"></span>
        </button>
        {show && (
          // Toast Message
          <p className="description">{message ? message : "oppsWrong"}</p>
        )}
      </Toast.Body>
    </Toast>
  );
};

AppNotifications.propTypes = {
  closeToast: PropTypes.func,
  visible: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default AppNotifications;
