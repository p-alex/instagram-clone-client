import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProfileDetails from '../../Components/ProfileDetails/ProfileDetails';
import ProfilePosts from '../../Components/ProfilePosts/ProfilePosts';
import { GET_USER_QUERY } from '../../GraphQL/Queries/userQueries';
import useFetch from '../../Hooks/useFetch';
import useRedux from '../../Hooks/useRedux';
import { IUserProfileInfo } from '../../interfaces';
import Layout from '../../Layout/Layout';
import {
  loadingProfile,
  loadingProfileError,
  resetProfileState,
  setProfileData,
} from '../../Redux/Profile';
import './Profile.scss';

interface IUserProfileResponse {
  statusCode: number;
  success: boolean;
  message: string;
  user: IUserProfileInfo;
}

const Profile = () => {
  const params = useParams();
  const { authState, profileState, dispatch } = useRedux();

  const [getProfile, { error }] = useFetch({
    query: GET_USER_QUERY,
    variables: {
      username: params.username,
    },
  });

  const handleGetProfileData = async () => {
    try {
      dispatch(loadingProfile());
      const response: IUserProfileResponse = await getProfile();
      if (response?.success) return dispatch(setProfileData({ ...response.user }));
      dispatch(loadingProfileError(error));
    } catch (error: any) {
      dispatch(loadingProfileError(error.message));
    }
  };

  useEffect(() => {
    if (profileState.user?.username !== params.username) handleGetProfileData();
  }, [params.username]);

  return (
    <Layout>
      <ProfileDetails />
      <ProfilePosts />
    </Layout>
  );
};

export default Profile;
