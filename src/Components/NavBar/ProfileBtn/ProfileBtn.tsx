import { useContext } from 'react';
import { AppContext } from '../../../Context/Context';
import './ProfileBtn.scss';

const ProfileBtn = () => {
  const { user } = useContext(AppContext);
  return (
    <button className="profileBtn">
      <img
        src={user.profileImg ? user.profileImg : '/images/default-profile-picture.png'}
        className="profileBtn__image"
        alt=""
      />
    </button>
  );
};

export default ProfileBtn;
