import Logo from '../Logo/Logo';
import SearchBar from '../SearchBar/SearchBar';
import ProfileBtn from './ProfileBtn/ProfileBtn';
import './NavBar.scss';
import CreatePostBtn from './CreatePostBtn/CreatePostBtn';

const NavBar = () => {
  return (
    <nav className="navBar">
      <div className="navBar__container">
        <Logo />
        <SearchBar />
        <div className="navBar__buttons">
          <CreatePostBtn />
          <ProfileBtn />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
