import ProfileDetails from '../../Components/ProfileDetails/ProfileDetails';
import ProfilePosts from '../../Components/ProfilePosts/ProfilePosts';
import { ProfileContextProvider } from '../../Context/ProfileContext';
import Layout from '../../Layout/Layout';
import './Profile.scss';

const Profile = () => {
  return (
    <Layout>
      <ProfileContextProvider>
        <ProfileDetails />
        <ProfilePosts />
      </ProfileContextProvider>
    </Layout>
  );
};

export default Profile;
