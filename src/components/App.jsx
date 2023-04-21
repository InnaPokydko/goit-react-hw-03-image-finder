import axios from 'axios';
import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';

const API_KEY = '34168491-a08a19ec58377d1b70d25ff83';
const PER_PAGE = 12;

class App extends Component {
state = {
images: [],
error: null,
status: 'idle',
query: '',
page: 1,
};

onFormSubmit = (input) => {
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
.get(`https://pixabay.com/api/?key=${API_KEY}&q=${this.state.query}&page=1&per_page=${PER_PAGE}`)
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
.get(`https://pixabay.com/api/?key=${API_KEY}&q=${this.state.query}&page=${this.state.page}&per_page=${PER_PAGE}`)
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

render() {
const { images, error, status } = this.state;

return (
  <div>
    <Searchbar onSubmit={this.onFormSubmit} />
    {status === 'idle' && <div>Enter a search query</div>}
    {status === 'pending' && <Loader loading={true} />}
    {status === 'rejected' && <h2>{error.message}</h2>}
    {status === 'resolved' && (
      <ImageGallery images={images}>
        <Button onClick={this.handleLoadMore} />
      </ImageGallery>
    )}
  </div>
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
