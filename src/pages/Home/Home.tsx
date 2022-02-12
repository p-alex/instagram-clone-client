import { useContext } from 'react';
import { AppContext } from '../../Context/Context';

const Home = () => {
  const { user } = useContext(AppContext);
  return (
    <div>
      Welcome! <br /> UserId: {user.userId}
      <br /> AccessToken: {user.accessToken}
    </div>
  );
};

export default Home;
