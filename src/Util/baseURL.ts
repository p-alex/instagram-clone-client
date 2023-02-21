export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5001/graphql'
    : 'https://bubble-server-p-alex.up.railway.app/graphql';
