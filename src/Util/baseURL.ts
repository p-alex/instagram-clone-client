export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001/graphql"
    : "https://bubble-server.pistolalex.com/graphql";
