import { useState } from 'react';
import { RootState } from '../Redux/Store';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../Util/baseURL';

function useFetch<Variables>({
  query,
}: {
  query: string;
}): [(variables: Variables) => Promise<any>, { isLoading: boolean; error: any }] {
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const apiRequest = async (variables: Variables) => {
    try {
      setIsLoading(true);
      const response = await fetch(BASE_URL, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${accessToken && 'Bearer ' + accessToken}`,
        },
        body: JSON.stringify({ query, variables }),
      });
      const responseJson = await response.json();
      const queryName = Object.keys(responseJson.data)[0];
      const responseData = responseJson.data[queryName];
      if (!responseData.success) {
        setError(responseData.message);
      }
      return responseData;
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return [apiRequest, { isLoading, error }];
}

export default useFetch;
