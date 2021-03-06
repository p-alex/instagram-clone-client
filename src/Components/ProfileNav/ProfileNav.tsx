import useRedux from "../../Hooks/useRedux";
import { changeTab } from "../../Redux/Profile";
import "./ProfileNav.scss";

const ProfileNav = () => {
  const { authState, profileState, dispatch } = useRedux();
  return (
    <div className="profileNav">
      <button
        className={`profileNav__btn ${
          profileState.activeTab === "posts" ? "profileBtn-active" : ""
        }`}
        onClick={() => dispatch(changeTab("posts"))}
      >
        <i className="fa-solid fa-border-all"></i> Posts
      </button>
      {authState.accessToken && authState.user?.id === profileState.user?.id && (
        <button
          className={`profileNav__btn ${
            profileState.activeTab === "saved" ? "profileBtn-active" : ""
          }`}
          onClick={() => dispatch(changeTab("saved"))}
        >
          <i className="fa-regular fa-bookmark"></i> Saved
        </button>
      )}
    </div>
  );
};

export default ProfileNav;
