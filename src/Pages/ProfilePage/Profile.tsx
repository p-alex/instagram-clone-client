import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import FollowersModal from '../../Components/FollowersModal/FollowersModal';
import ProfileDetails from '../../Components/ProfileDetails/ProfileDetails';
import ProfileNav from '../../Components/ProfileNav/ProfileNav';
import ProfilePosts from '../../Components/ProfilePosts/ProfilePosts';
import { GET_USER_QUERY } from '../../GraphQL/Queries/userQueries';
import useFetch from '../../Hooks/useFetch';
import useRedux from '../../Hooks/useRedux';
import { IUserProfileInfo } from '../../interfaces';
import Layout from '../../Layout/Layout';
import {
  closePostModal,
  loadingProfile,
  loadingProfileError,
  setProfileData,
} from '../../Redux/Profile';
import Spinner from '../../Ui/Spinner';
import './Profile.scss';

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

  const [selectedUsersModal, setSelectedUsersModal] = useState<
    'followers' | 'following' | null
  >(null);

  const [getProfile, { isLoading, error }] = useFetch({
    query: GET_USER_QUERY,
  });

  const handleGetProfileData = async () => {
    try {
      dispatch(loadingProfile());
      const response: IUserProfileResponse = await getProfile({
        username: params.username,
        authenticatedUserId: authState.user !== null ? authState.user.id : null,
      });
      if (response?.success)
        return dispatch(
          setProfileData({
            userData: response.user,
            isFollowed: response.isFollowed,
          })
        );
      dispatch(loadingProfileError(error));
    } catch (error: any) {
      dispatch(loadingProfileError('Something went wrong.'));
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
        <Helmet>
          <meta
            name="description"
            content={`${profileState.user?.username}'s profile page on Bubble.`}
          />
          <title>{`${profileState.user?.fullname + ' '}@${
            profileState.user?.username
          } • Bubble photos`}</title>
        </Helmet>
        {isLoading && <Spinner size="small" />}
        {!isLoading && profileState.user && (
          <>
            <ProfileDetails setSelectedUsersModal={setSelectedUsersModal} />
            <ProfileNav />
            <ProfilePosts
              posts={profileState.user.posts.postsList}
              isProfilePage={true}
            />
            {selectedUsersModal && (
              <FollowersModal
                userId={profileState.user.id}
                type={selectedUsersModal}
                setSelectedUsersModal={setSelectedUsersModal}
              />
            )}
          </>
        )}
        {!isLoading && error && <p>{error}</p>}
      </>
    </Layout>
  );
};

export default Profile;
