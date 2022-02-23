import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreatePost from '../../Components/CreatePostModal/CreatePostModal';
import NavBar from '../../Components/NavBar/NavBar';
import { GlobalContext } from '../../Context/GlobalContext';
import { NavBarContextProvider } from '../../Context/NavBarContext';

const Home = () => {
  const { user } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.userId) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <>
      {user.userId && (
        <>
          <NavBarContextProvider>
            <NavBar />
            <CreatePost />
          </NavBarContextProvider>
        </>
      )}
    </>
  );
};

export default Home;
