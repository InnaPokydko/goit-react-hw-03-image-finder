import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

class App extends Component {
  state = {
    query: '', 
    page: 1, 
  };

  onFormSubmit = input => {
    this.setState({
      query: input,
      page: 1, // скидаємо номер сторінки при зміні запиту
    });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.onFormSubmit} />
        <ImageGallery query={this.state.query} page={this.state.page} /> {/* передаємо номер сторінки */}
      </div>
    );
  }
}

export default App;
