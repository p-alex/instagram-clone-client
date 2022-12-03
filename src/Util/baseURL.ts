export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5001/graphql'
    : 'https://web-production-05a0.up.railway.app/graphql';
