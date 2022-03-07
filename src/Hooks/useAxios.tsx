import { useState, useContext } from 'react';
import axios from '../Api/axios';
import { GlobalContext } from '../Context/GlobalContext';

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
      const { data } = await axios.post(
        '',
        { query, variables },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${user?.accessToken && 'Bearer ' + user.accessToken}`,
          },
        }
      );
      const queryName = Object.keys(data.data)[0];
      const responseData = data.data[queryName];
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
