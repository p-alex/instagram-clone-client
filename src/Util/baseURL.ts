export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5001/graphql'
    : 'https://bubble-9021.herokuapp.com/graphql';
