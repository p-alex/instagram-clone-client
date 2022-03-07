import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../Context/GlobalContext';
import Layout from '../../Layout/Layout';

const Home = () => {
  const { user } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.userId) {
      navigate('/login');
    }
  }, [user, navigate]);

  return <Layout>stuff</Layout>;
};

export default Home;
