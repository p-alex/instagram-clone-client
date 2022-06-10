import { useState } from "react";
import { LOGOUT_USER_MUTATION } from "../../../GraphQL/Mutations/authMutations";
import { logoutUser } from "../../../Redux/Auth";
import { useNavigate } from "react-router-dom";
import "./ProfileBtn.scss";
import useRedux from "../../../Hooks/useRedux";
import { resetProfileState } from "../../../Redux/Profile";
import useFetchWithRetry from "../../../Hooks/useFetchWithRetry";
import { resetFeedState } from "../../../Redux/Feed";
import { resetSuggestions } from "../../../Redux/Suggestions";

const ProfileBtn = () => {
  const navigate = useNavigate();
  const { authState, dispatch } = useRedux();
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [logoutUserRequest, { error }] = useFetchWithRetry({
    query: LOGOUT_USER_MUTATION,
    variables: {},
    accessToken: authState.accessToken,
  });
  const handleLogout = async () => {
    try {
      const response = await logoutUserRequest();
      if (response.success) {
        dispatch(logoutUser());
        dispatch(resetProfileState());
        navigate("/login");
      }
    } catch (err) {
      console.log(error);
    }
  };
  return (
    <div className="profileBtn">
      <button
        className="profileBtn__btn"
        onClick={() => setIsDropdownActive(!isDropdownActive)}
        aria-label="Toggle profile menu"
      >
        <img
          src={authState.user?.profilePicture.smallPicture}
          className="profileBtn__image"
          alt=""
          width="40"
          height="40"
        />
      </button>
      {isDropdownActive && (
        <div className="profileBtn__dropdown">
          <button
            onClick={() => {
              setIsDropdownActive(false);
              navigate(`/users/${authState.user?.username}`);
            }}
            role="link"
          >
            <i className="fa-solid fa-user"></i> Profile
          </button>
          <button onClick={() => navigate("/profile/edit")}>
            <i className="fa-solid fa-gear"></i> Settings
          </button>
          <button
            onClick={() => {
              handleLogout();
              setIsDropdownActive(false);
              dispatch(resetFeedState());
              dispatch(resetSuggestions());
            }}
            className="profileBtn__deleteBtn"
          >
            <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileBtn;
