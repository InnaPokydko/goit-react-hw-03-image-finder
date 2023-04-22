import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ closeModal, largeImage }) => {
  const handleKeyDown = (e) => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  return createPortal(
    <>
      <div className="Overlay" onClick={handleBackdropClick} onKeyDown={handleKeyDown}>
        <div className="Modal">
          <img src={largeImage} alt="" />
        </div>
      </div>
    </>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
};
