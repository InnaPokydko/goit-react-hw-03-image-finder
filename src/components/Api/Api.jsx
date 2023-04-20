import axios from 'axios';

const PER_PAGE = 12;

const fetchImages = (query, page) => {
  return axios.get(
    `https://pixabay.com/api/?key=34168491-a08a19ec58377d1b70d25ff83&q=${query}&page=${page}&per_page=${PER_PAGE}` 
  );
};

export default fetchImages;