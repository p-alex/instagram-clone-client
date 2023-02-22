export const SERVER_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://bubble-server.pistolalex.com/graphql'
    : 'http://localhost:5001/graphql';
