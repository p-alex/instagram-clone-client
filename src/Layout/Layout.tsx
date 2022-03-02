import { useContext } from 'react';
import CreatePostModal from '../Components/CreatePostModal/CreatePostModal';
import NavBar from '../Components/NavBar/NavBar';
import { GlobalContext } from '../Context/GlobalContext';
import { NavBarContextProvider } from '../Context/NavBarContext';

const Layout = ({ children }: { children: any }) => {
  const { user } = useContext(GlobalContext);
  return (
    <>
      <NavBarContextProvider>
        <NavBar />
        {user?.userId && <CreatePostModal />}
      </NavBarContextProvider>
      {children}
    </>
  );
};

export default Layout;
