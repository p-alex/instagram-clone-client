import { useState, useContext } from 'react';
import { GlobalContext } from '../Context/GlobalContext';
const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000/graphql'
    : 'https://instagram-clone-9021.herokuapp.com/graphql';
const useAxios = ({
  query,
  variables,
}: {
  query: string;
  variables: any;
}): [() => Promise<any>, { isLoading: boolean; error: any }] => {
  const { user } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const apiRequest = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(BASE_URL, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${user?.accessToken && 'Bearer ' + user.accessToken}`,
        },
        body: JSON.stringify({ query, variables }),
      });
      const responseJson = await response.json();
      const queryName = Object.keys(responseJson.data)[0];
      const responseData = responseJson.data[queryName];
      if (responseData.success) {
        return responseData;
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return [apiRequest, { isLoading, error }];
};

export default useAxios;
