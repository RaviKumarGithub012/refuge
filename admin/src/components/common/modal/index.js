/**
 * This component is for modal or popup
 */

import React from "react";
import { Modal, Button } from 'react-bootstrap';

const ModalBox = ({
  title = "confirmation",
  modalClose,
  isModalOpen = false,
  children = <div>{"noDataFound"}</div>,
  ModalFooter = false,
  hideHeader = false,
  size = "md",
  className,
  subHeading
}) => {
  return (
    <Modal
      onHide={modalClose}
      show={isModalOpen}
      size={size}
      className={className}
    >
      {
        hideHeader ? null : <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
          {subHeading && <h5>{subHeading}</h5>}
        </Modal.Header>
      }
      <Modal.Body>
        {children}
        {
          ModalFooter ? <Modal.Footer>
            <Button variant="secondary" onClick={modalClose}>
              {t('cancel')}
            </Button>
          </Modal.Footer> : null
        }
      </Modal.Body>
    </Modal>
  );
};

export default ModalBox;
