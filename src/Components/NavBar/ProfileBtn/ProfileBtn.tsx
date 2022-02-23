import { useState, useContext } from 'react';
import { GlobalContext } from '../../../Context/GlobalContext';
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
          src={user.profileImg ? user.profileImg : '/images/default-profile-picture.png'}
          className="profileBtn__image"
          alt=""
        />
      </button>
      {isDropdownActive && (
        <div className="profileBtn__dropdown">
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
