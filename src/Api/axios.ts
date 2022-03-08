import axios from 'axios';
const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000/graphql'
    : 'https://instagram-clone-9021.herokuapp.com/graphql';

export default axios.create({
  baseURL: BASE_URL,
});
