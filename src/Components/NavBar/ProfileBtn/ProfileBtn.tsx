import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DEFAULT_PROFILE_PICTURE_URL } from '../../../default-profile-pic-url';
import { LOGOUT_USER_MUTATION } from '../../../GraphQL/Mutations/authMutations';
import useAxios from '../../../Hooks/useAxios';
import { logoutUser } from '../../../Redux/Auth';
import { RootState } from '../../../Redux/Store';
import { useNavigate } from 'react-router-dom';
import './ProfileBtn.scss';

const ProfileBtn = () => {
  const navigate = useNavigate();
  const authState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [logoutUserRequest, { error }] = useAxios({
    query: LOGOUT_USER_MUTATION,
    variables: {},
  });
  const handleLogout = async () => {
    try {
      const response = await logoutUserRequest();
      if (response.success) {
        dispatch(logoutUser());
        navigate('/login');
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
      >
        <img
          src={
            authState.user?.profilePicture
              ? authState.user?.profilePicture
              : DEFAULT_PROFILE_PICTURE_URL
          }
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
            Profile
          </button>
          <button
            onClick={() => {
              handleLogout();
              setIsDropdownActive(false);
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileBtn;
