import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../../Context/GlobalContext';
import { DEFAULT_PROFILE_PICTURE_URL } from '../../../default-profile-pic-url';
import './ProfileBtn.scss';

const ProfileBtn = () => {
  const { user, handleLogout } = useContext(GlobalContext);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  return (
    <div className="profileBtn">
      <button
        className="profileBtn__btn"
        onClick={() => setIsDropdownActive(!isDropdownActive)}
      >
        <img
          src={user?.profileImg ? user.profileImg : DEFAULT_PROFILE_PICTURE_URL}
          className="profileBtn__image"
          alt=""
          width="40"
          height="40"
        />
      </button>
      {isDropdownActive && (
        <div className="profileBtn__dropdown">
          <Link to={`/users/${user?.username}`}>Profile</Link>
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
