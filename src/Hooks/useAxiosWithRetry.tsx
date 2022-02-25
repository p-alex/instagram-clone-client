import { useState } from 'react';
import axios from '../Api/axios';
import useRefreshToken from './useRefreshToken';

const useAxiosWithRetry = ({
  query,
  variables,
  accessToken,
}: {
  query: string;
  variables: any;
  accessToken: string | undefined;
}): [() => Promise<any>, { isLoading: boolean; error: string }] => {
  const refresh = useRefreshToken();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const request = async (accessToken: string): Promise<any> => {
    try {
      if (accessToken) {
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
        if (data) {
          const queryName = Object.keys(data.data)[0];
          const requestData = data.data[queryName];
          return requestData;
        }
        return { statusCode: 401, success: false, message: 'Unauthorized' };
      } else {
        throw new Error('No access token');
      }
    } catch (error: any) {
      return { statusCode: 401, success: false, message: 'Unauthorized' };
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
