import { REFRESH_TOKEN_MUTATION } from "../GraphQL/Mutations/authMutations";
import { BASE_URL } from "../Util/baseURL";
import { useDispatch } from "react-redux";
import { logoutUser, refreshToken } from "../Redux/Auth";

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const refresh = async (): Promise<string> => {
    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
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
          profileImg: string;
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
              profilePicture: data.user.profileImg,
              hasFollowings: data.user.hasFollowings,
            },
            accessToken: data.user.accessToken,
          })
        );
        return data.user.accessToken;
      } else {
        dispatch(logoutUser());
        return "";
      }
    } catch (error: any) {
      dispatch(logoutUser());
      return "";
    }
  };

  return refresh;
};

export default useRefreshToken;
