import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProfileDetails from "../../Components/ProfileDetails/ProfileDetails";
import ProfileNav from "../../Components/ProfileNav/ProfileNav";
import ProfilePosts from "../../Components/ProfilePosts/ProfilePosts";
import { GET_USER_QUERY } from "../../GraphQL/Queries/userQueries";
import useFetch from "../../Hooks/useFetch";
import useRedux from "../../Hooks/useRedux";
import { IUserProfileInfo } from "../../interfaces";
import Layout from "../../Layout/Layout";
import {
  closePostModal,
  loadingProfile,
  loadingProfileError,
  setProfileData,
} from "../../Redux/Profile";
import Spinner from "../../Ui/Spinner";
import "./Profile.scss";

interface IUserProfileResponse {
  statusCode: number;
  success: boolean;
  message: string;
  user: IUserProfileInfo;
  isFollowed: boolean;
}

const Profile = () => {
  const params = useParams();
  const { authState, profileState, dispatch } = useRedux();

  const [getProfile, { isLoading, error }] = useFetch({
    query: GET_USER_QUERY,
    variables: {
      username: params.username,
      authenticatedUserId: authState.user !== null ? authState.user.id : null,
    },
  });

  const handleGetProfileData = async () => {
    try {
      dispatch(loadingProfile());
      const response: IUserProfileResponse = await getProfile();
      if (response?.success)
        return dispatch(
          setProfileData({
            userData: response.user,
            isFollowed: response.isFollowed,
          })
        );
      dispatch(loadingProfileError(error));
    } catch (error: any) {
      dispatch(loadingProfileError("Something went wrong."));
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (profileState.user?.username !== params.username) handleGetProfileData();
  }, [params.username]);

  useEffect(() => {
    dispatch(closePostModal());
  }, [profileState.user?.username]);

  return (
    <Layout>
      <>
        {isLoading && <Spinner size="big" />}
        {!isLoading && profileState.user && (
          <>
            <ProfileDetails />
            <ProfileNav />
            <ProfilePosts />
          </>
        )}
        {!isLoading && error && <p>{error}</p>}
      </>
    </Layout>
  );
};

export default Profile;
