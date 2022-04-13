import { memo } from 'react';
import Logo from '../Logo/Logo';
import SearchBar from '../SearchBar/SearchBar';
import ProfileBtn from './ProfileBtn/ProfileBtn';
import './NavBar.scss';
import CreatePostBtn from './CreatePostBtn/CreatePostBtn';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';
const NavBar = () => {
  const authState = useSelector((state: RootState) => state.auth);
  return (
    <nav className="navBar">
      <div className="navBar__container">
        <Logo />
        <SearchBar />
        <div className="navBar__buttonsAndLinks">
          {authState.user?.id ? (
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

export default memo(NavBar);
