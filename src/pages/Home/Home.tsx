import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreatePost from '../../Components/CreatePost/CreatePost';
import NavBar from '../../Components/NavBar/NavBar';
import { AppContext } from '../../Context/GlobalContext';
import { NavBarContextProvider } from '../../Context/NavBarContext';

const Home = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.userId) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <>
      <NavBarContextProvider>
        <NavBar />
        <CreatePost />
      </NavBarContextProvider>
    </>
  );
};

export default Home;
