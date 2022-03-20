import { useSelector } from 'react-redux';
import CreatePostModal from '../Components/CreatePostModal/CreatePostModal';
import NavBar from '../Components/NavBar/NavBar';
import { NavBarContextProvider } from '../Context/NavBarContext';
import { RootState } from '../Redux/Store';
import './Layout.scss';

const Layout = ({ children }: { children: any }) => {
  const authState = useSelector((state: RootState) => state.auth);

  return (
    <>
      <NavBarContextProvider>
        <NavBar />
        {authState.user?.id && <CreatePostModal />}
      </NavBarContextProvider>
      <main className="mainContainer">{children}</main>
    </>
  );
};

export default Layout;
