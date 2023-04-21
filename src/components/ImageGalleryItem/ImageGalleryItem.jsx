import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { ImageGalleryItemStyle, ImgStyle } from './ImageGalleryItem.styled';

export default class ImageGalleryItem extends PureComponent {
  handleClick = () => {
    this.props.onImageClick(this.props.item.largeImageURL);
  };

  render() {
    const { webformatURL, tags } = this.props.item;
    return (
      <ImageGalleryItemStyle>
        <ImgStyle
          src={webformatURL}
          alt={tags}
          onClick={this.handleClick}
          className="ImageGalleryItem-image"
        />
      </ImageGalleryItemStyle>
    );
  }
}

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onImageClick: PropTypes.func.isRequired,
};