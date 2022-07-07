import { memo, useState } from "react";
import Logo from "../Logo/Logo";
import ProfileBtn from "./ProfileBtn/ProfileBtn";
import "./NavBar.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import { useContext } from "react";
import { NavBarContext } from "../../Context/NavBarContext";
import CreatePostBtn from "./CreatePostBtn/CreatePostBtn";
import SearchBar from "../SearchBar/SearchBar";
import CreatePostModal from "../CreatePostModal/CreatePostModal";
import MobileSearchBar from "../MobileSearchBar/MobileSearchBar";

const NavBar = () => {
  const authState = useSelector((state: RootState) => state.auth);
  const { isCreatePostModalActive } = useContext(NavBarContext);
  const [isMobileSearchBarActive, setIsMobileSearchBarActive] = useState(false);
  return (
    <nav className="navBar">
      <div className="navBar__container">
        <Link to="/">
          <Logo />
        </Link>
        <SearchBar />
        <div className="navBar__buttonsAndLinks">
          {authState.user?.id ? (
            <>
              <button
                className="navBar__btn navBar-searchBtn"
                onClick={() =>
                  setIsMobileSearchBarActive((prevState) => !prevState)
                }
                id="navbar-toggle-mobile-search"
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
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
      {isCreatePostModalActive && <CreatePostModal />}
      {isMobileSearchBarActive && (
        <MobileSearchBar
          toggleMobileSearch={() =>
            setIsMobileSearchBarActive((prevState) => !prevState)
          }
        />
      )}
    </nav>
  );
};

export default memo(NavBar);
