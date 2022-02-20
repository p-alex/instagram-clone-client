import axios from '../Api/axios';
import { useContext } from 'react';
import { AppContext } from '../Context/Context';

const REFRESH_TOKEN_QUERY = `
    mutation {
        refreshToken {
            success
            message
            userId
            accessToken
        }
    }
`;

const useRefreshToken = () => {
  const { setUser } = useContext(AppContext);

  const refresh = async () => {
    try {
      const response = await axios.post(
        '',
        {
          query: REFRESH_TOKEN_QUERY,
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
