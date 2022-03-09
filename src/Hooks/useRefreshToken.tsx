import { useContext } from 'react';
import { GlobalContext } from '../Context/GlobalContext';
import { REFRESH_TOKEN_MUTATION } from '../GraphQL/Mutations/authMutations';
const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000/graphql'
    : 'https://instagram-clone-9021.herokuapp.com/graphql';
const useRefreshToken = () => {
  const { setUser } = useContext(GlobalContext);

  const refresh = async (): Promise<string> => {
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: REFRESH_TOKEN_MUTATION }),
      });
      const responseJson = await response.json();
      const data: {
        success: boolean;
        message: string;
        userId: string;
        username: string;
        profileImg: string;
        accessToken: string;
      } = responseJson.data.refreshToken;
      if (data.success) {
        setUser({
          userId: data.userId,
          username: data.username,
          profileImg: data.profileImg,
          accessToken: data.accessToken,
        });
        return data.accessToken;
      } else {
        setUser(null);
        return '';
      }
    } catch (error: any) {
      setUser(null);
      return '';
    }
  };

  return refresh;
};

export default useRefreshToken;
