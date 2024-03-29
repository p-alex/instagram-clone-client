import { REFRESH_TOKEN_MUTATION } from '../GraphQL/Mutations/authMutations';
import { SERVER_BASE_URL } from '../Util/serverBaseURL';
import { useDispatch } from 'react-redux';
import { logoutUser, refreshToken } from '../Redux/Auth';

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const refresh = async (): Promise<string> => {
    try {
      const response = await fetch(SERVER_BASE_URL, {
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
        user: {
          id: string;
          username: string;
          email: string;
          bio: string;
          fullname: string;
          profilePicture: {
            fullPicture: string;
            smallPicture: string;
          };
          hasFollowings: boolean;
          accessToken: string;
        };
      } = responseJson.data.refreshToken;
      if (data.success) {
        dispatch(
          refreshToken({
            user: {
              id: data.user.id,
              username: data.user.username,
              email: data.user.email,
              bio: data.user.bio,
              fullname: data.user.fullname,
              profilePicture: {
                fullPicture: data.user.profilePicture.fullPicture,
                smallPicture: data.user.profilePicture.smallPicture,
              },
              hasFollowings: data.user.hasFollowings,
            },
            accessToken: data.user.accessToken,
          })
        );
        return data.user.accessToken;
      } else {
        dispatch(logoutUser());
        return '';
      }
    } catch (error: any) {
      dispatch(logoutUser());
      return '';
    }
  };

  return refresh;
};

export default useRefreshToken;
