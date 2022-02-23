import { useContext, useState } from 'react';
import { isNullOrUndefined } from 'util';
import axios from '../Api/axios';
import { GlobalContext } from '../Context/GlobalContext';
import useRefreshToken from './useRefreshToken';

const useAxiosWithRetry = (
  query: string,
  variables: any
): [() => Promise<any>, { isLoading: boolean; error: string }] => {
  const refresh = useRefreshToken();
  const { user, setUser } = useContext(GlobalContext);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const request = async (accessToken: string): Promise<any> => {
    try {
      const { data }: any = await axios.post(
        '',
        { query, variables },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const queryName = Object.keys(data.data)[0];
      return data.data[queryName];
    } catch (error: any) {
      console.log(error.message);
      return null;
    }
  };

  const retryRequest = async () => {
    const newAccessToken = await refresh();
    const newRequest = await request(newAccessToken);
    return newRequest;
  };

  const getData = async () => {
    try {
      setIsLoading(true);
      const data = await request(user.accessToken);
      if (!data) return;
      if (data.statusCode === 401) {
        const data = await retryRequest();
        if (data.statusCode === 200 || data.statusCode === 201) {
          return data;
        }
        return {};
      }
      return data;
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return [getData, { isLoading, error }];
};

export default useAxiosWithRetry;
