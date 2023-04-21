import { Component } from 'react';

class Modal extends Component {
  state = {
    isOpen: false,
    imageUrl: '',
  };

  openModal = (imageUrl) => {
    this.setState({
      isOpen: true,
      imageUrl,
    });
    document.addEventListener('keydown', this.handleKeyDown);
  };

  closeModal = () => {
    this.setState({
      isOpen: false,
      imageUrl: '',
    });
    document.removeEventListener('keydown', this.handleKeyDown);
  };

  handleKeyDown = (e) => {
    if (e.code === 'Escape') {
      this.closeModal();
    }
  };

  handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      this.closeModal();
    }
  };

  render() {
    const { isOpen, imageUrl } = this.state;

    return (
      isOpen && (
        <div className="Overlay" onClick={this.handleBackdropClick}>
          <div className="Modal">
            <img src={imageUrl} alt="" />
          </div>
        </div>
      )
    );
  }
}

export default Modal;