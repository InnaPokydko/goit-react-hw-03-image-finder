import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalImg } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  
  handleKeyDown = (e) => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      this.props.onCloseModal();
    }
  };

  render() {
    return createPortal(
      <Overlay onClick={this.handleBackdropClick} onKeyDown={this.handleKeyDown}>
        <ModalImg>
          <img src={this.props.largeImage} alt={this.props.tags} />
        </ModalImg>
      </Overlay>,
      modalRoot
    );
  }
}

export default Modal;

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
    largeImage: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
}




// import { createPortal } from 'react-dom';
// import PropTypes from 'prop-types';
// import { Overlay,  ModalImg } from './Modal.styled';

// const modalRoot = document.querySelector('#modal-root');

// const Modal = ({ onCloseModal, largeImage, tags }) => {
//   const handleKeyDown = (e) => {
//     if (e.code === 'Escape') {
//       onCloseModal();
//     }
//   };

//   const handleBackdropClick = (e) => {
//     if (e.currentTarget === e.target) {
//       onCloseModal();
//     }
//   };

//   return createPortal(

//       <Overlay onClick={handleBackdropClick} onKeyDown={handleKeyDown}>
//         <ModalImg>
//           <img src={largeImage} alt={tags} />
//         </ModalImg>
//       </Overlay>,
//     modalRoot
//   );
// };
