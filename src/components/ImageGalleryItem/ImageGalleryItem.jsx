import PropTypes from 'prop-types';
import { PureComponent } from 'react';

export default class ImageGalleryItem extends PureComponent {
  render() {
    const { webformatURL, largeImageURL, tags } = this.props.item;
    return (
      <li>
        <img
          src={webformatURL}
          alt={tags}
          onClick={() => this.props.onImageClick(largeImageURL)}
          className="ImageGalleryItem-image"
        />
      </li>
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
