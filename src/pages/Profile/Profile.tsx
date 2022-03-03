import { useParams } from 'react-router-dom';
import Layout from '../../Layout/Layout';
import './Profile.scss';

const Profile = () => {
  const params = useParams();
  return (
    <Layout>
      <div>{params.username}'s Profile</div>
    </Layout>
  );
};

export default Profile;
