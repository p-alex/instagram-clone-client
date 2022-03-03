import Logo from '../Logo/Logo';
import SearchBar from '../SearchBar/SearchBar';
import ProfileBtn from './ProfileBtn/ProfileBtn';
import './NavBar.scss';
import CreatePostBtn from './CreatePostBtn/CreatePostBtn';
import { useContext } from 'react';
import { GlobalContext } from '../../Context/GlobalContext';
import { Link } from 'react-router-dom';
const NavBar = () => {
  const { user } = useContext(GlobalContext);
  return (
    <nav className="navBar">
      <div className="navBar__container">
        <Logo />
        <SearchBar />
        <div className="navBar__buttonsAndLinks">
          {user?.userId ? (
            <>
              <CreatePostBtn />
              <ProfileBtn />
            </>
          ) : (
            <>
              <Link to="/login" className="navBar__link">
                Log In
              </Link>
              <Link to="/register" className="navBar__link">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
