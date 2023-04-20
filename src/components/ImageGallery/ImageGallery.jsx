import { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import fetchImages from 'components/Api/Api';

export default class ImageGallery extends Component {
  state = {
    images: [],
    error: null,
    status: 'idle',
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.query !== this.props.query) { // перевірка на оновлення запиту
      this.setState({ status: 'pending' });
      fetchImages(this.props.query, this.state.page) // викликаємо функцію для запиту
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error(`No images`));
        })
        .then(data => {
          const images = data.hits; // отримуємо масив зображень з відповіді
          this.setState({ images, status: 'resolved' });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }
  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 })); // збільшуємо значення сторінки при завантаженні наступних зображень
  };
  
  render() {
    const { images, error, status } = this.state;

    if (status === 'idle') {
      return <div>Enter a search query</div>;
    }

    if (status === 'pending') {
      return <div>Loading...</div>;
    }

    if (status === 'rejected') {
      return <h2>{error.message}</h2>;
    }

    if (status === 'resolved') {
      return (
        <div>
          {images.map(img => (
            <ImageGalleryItem
              key={img.id}
              item={img}
              onImageClick={this.onClick}
            />
          ))}
        </div>
      );
    }
  }
}
