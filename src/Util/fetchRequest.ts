import { BASE_URL } from './baseURL';

export const fetchRequest = async (
  query: string,
  variables: any,
  accessToken: string
) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await response.json();
  const queryName = Object.keys(json.data)[0];
  const data = json.data[queryName];
  return data;
};

export default fetchRequest;
