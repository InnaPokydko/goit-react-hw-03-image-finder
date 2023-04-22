import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { AppContainer, IdleMessage } from './App.styled';

const API_KEY = '34168491-a08a19ec58377d1b70d25ff83';
const PER_PAGE = 12;

class App extends Component {
  state = {
    images: [],
    error: null,
    status: 'idle',
    query: '',
    page: 1,
    isModalOpen: false,
    selectedImage: '',
  };

  onFormSubmit = (input) => {
    if (input === '') {
      toast.error('You entered an invalid value');
      return;
    }
    this.setState({
      query: input,
      page: 1,
      images: [],
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.setState({ status: 'pending' });
      axios
        .get(
          `https://pixabay.com/api/?key=${API_KEY}&q=${this.state.query}&page=1&per_page=${PER_PAGE}`
        )
        .then((response) => {
          this.setState({
            images: response.data.hits,
            status: 'resolved',
          });
        })
        .catch((error) => {
          console.log(error);
          this.setState({ error, status: 'rejected' });
        });
    }
    if (prevState.page !== this.state.page) {
      axios
        .get(
          `https://pixabay.com/api/?key=${API_KEY}&q=${this.state.query}&page=${this.state.page}&per_page=${PER_PAGE}`
        )
        .then((response) => {
          this.setState((prevState) => ({
            images: [...prevState.images, ...response.data.hits],
            status: 'resolved',
          }));
        })
        .catch((error) => {
          console.log(error);
          this.setState({ error, status: 'rejected' });
        });
    }
  }

  handleLoadMore = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };
  
  handleImageClick = (imageUrl) => {
    this.setState({
      isModalOpen: true,
      selectedImage: imageUrl,
    });
  };

  handleCloseModal = () => {
    this.setState({
      isModalOpen: false,
      selectedImage: '',
    });
  };

  render() {
    const { images, error, status, isModalOpen, selectedImage } = this.state;

      return (
      <AppContainer>
        <Searchbar onSubmit={this.onFormSubmit} />
        {status === 'idle' && <IdleMessage>Enter a search query</IdleMessage>}
        {status === 'pending' && <Loader loading={true} />}
        {status === 'rejected' && <h2>{error.message}</h2>}
        {status === 'resolved' && (
          <>
            <ImageGallery images={images} onImageClick={this.handleImageClick}>
              <Button onClick={this.handleLoadMore} />
            </ImageGallery>
            <ToastContainer />
            {isModalOpen && (
              <Modal
                imageUrl={selectedImage}
                onCloseModal={this.handleCloseModal}
              />
            )}
          </>
        )}
      </AppContainer>
    );
  }
}

export default App;

// const API_KEY = '34168491-a08a19ec58377d1b70d25ff83';
// const PER_PAGE = 12;

// class App extends Component {
//   state = {
//   images: [], // зберігаємо дані з API
//   query: '',
//   page: 1,
//   };

//   onFormSubmit = (input) => {
//   this.setState({
//   query: input,
//   page: 1,
//   });
//   this.fetchImages(input, 1); // викликаємо функцію для отримання даних з API
//   };

//   fetchImages = (query, page) => {
//   axios
//   .get(`https://pixabay.com/api/?key=${API_KEY}&q=${query}&page=${page}&per_page=${PER_PAGE}`)
//   .then((response) => {
//   this.setState((prevState) => ({
//   images: [...prevState.images, ...response.data.hits], // додаємо нові дані до існуючих
//   page: prevState.page + 1, // збільшуємо номер сторінки
//   }));
//   })
//   .catch((error) => {
//   console.log(error);
//   });
//   };

//   render() {
//   return (
//   <div>
//   <Searchbar onSubmit={this.onFormSubmit} />
//   <ImageGallery images={this.state.images} /> {/* передаємо дані з API */}
//   </div>
//   );
//   }
//   }

// export default App;
