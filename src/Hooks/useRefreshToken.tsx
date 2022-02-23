import axios from '../Api/axios';
import { useContext } from 'react';
import { GlobalContext } from '../Context/GlobalContext';
import { REFRESH_TOKEN_MUTATION } from '../GraphQL/Mutations/authMutations';

const useRefreshToken = () => {
  const { setUser } = useContext(GlobalContext);

  const refresh = async () => {
    try {
      const response = await axios.post(
        '',
        {
          query: REFRESH_TOKEN_MUTATION,
        },
        {
          withCredentials: true,
        }
      );
      const data: {
        success: boolean;
        message: string;
        userId: string;
        username: string;
        profileImg: string;
        accessToken: string;
      } = response.data.data.refreshToken;
      setUser({
        userId: data.userId,
        username: data.username,
        profileImg: data.profileImg,
        accessToken: data.accessToken,
      });
      return data.accessToken;
    } catch (error: any) {
      setUser({ userId: '', username: '', profileImg: '', accessToken: '' });
      return '';
    }
  };

  return refresh;
};

export default useRefreshToken;
