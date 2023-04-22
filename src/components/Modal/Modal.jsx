import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay,  ModalImg } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onCloseModal, largeImage }) => {
  const handleKeyDown = (e) => {
    if (e.code === 'Escape') {
      onCloseModal();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  };

  return createPortal(
    <>
      <Overlay onClick={handleBackdropClick} onKeyDown={handleKeyDown}>
        <ModalImg>
          <img src={largeImage} alt="" />
        </ModalImg>
      </Overlay>
    </>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
};
