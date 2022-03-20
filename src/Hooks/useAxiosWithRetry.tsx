import { useState } from 'react';
import { BASE_URL } from '../Util/baseURL';
import useRefreshToken from './useRefreshToken';

const useAxiosWithRetry = ({
  query,
  variables,
  accessToken,
}: {
  query: string;
  variables: any;
  accessToken: string | null;
}): [() => Promise<any>, { isLoading: boolean; error: string }] => {
  const refresh = useRefreshToken();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const request = async (accessToken: string): Promise<any> => {
    setError('');
    try {
      if (accessToken) {
        const response = await fetch(BASE_URL, {
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ query, variables }),
        });
        const responseJson = await response.json();
        if (responseJson) {
          const queryName = Object.keys(responseJson.data)[0];
          const requestData = responseJson.data[queryName];
          return requestData;
        }
        return { statusCode: 401, success: false, message: 'Unauthorized' };
      } else {
        throw new Error('No access token');
      }
    } catch (error: any) {
      if (error.response.status === 413) {
        setError('Your image is too large.');
        return { statusCode: 413, success: false, message: 'Your image is to large.' };
      }
      setError(error.message);
      return { statusCode: 500, success: false, message: 'Something went wrong.' };
    }
  };

  const retryRequest = async (): Promise<any | null> => {
    try {
      const newAccessToken = await refresh();
      if (newAccessToken) {
        const retryRequestData = await request(newAccessToken);
        return retryRequestData;
      }
      return null;
    } catch (error: any) {
      return null;
    }
  };

  const getData = async () => {
    try {
      setIsLoading(true);
      if (accessToken) {
        const data: { statusCode: number; success: boolean; message: string } =
          await request(accessToken);
        if (data?.statusCode === 401) {
          const data = await retryRequest();
          if (!data) return { statusCode: 401, success: false, message: 'Unauthorized' };
          if (data.statusCode === 200 || data.statusCode === 201) return data;
        }
        return data;
      }
    } catch (error: any) {
      setError(error.message);
      return { statusCode: 401, success: false, message: 'Unauthorized' };
    } finally {
      setIsLoading(false);
    }
  };

  return [getData, { isLoading, error }];
};

export default useAxiosWithRetry;
