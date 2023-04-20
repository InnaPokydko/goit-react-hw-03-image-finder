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
