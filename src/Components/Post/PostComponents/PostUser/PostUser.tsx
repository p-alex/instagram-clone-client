import { Link } from 'react-router-dom';
import { DEFAULT_PROFILE_PICTURE_URL } from '../../../../default-profile-pic-url';
import useRedux from '../../../../Hooks/useRedux';
import { togglePostOptions } from '../../../../Redux/Post';
import './PostUser.scss';

const PostUser = ({
  username,
  profilePicture,
}: {
  username: string | undefined;
  profilePicture: string | undefined;
}) => {
  const { dispatch } = useRedux();
  return (
    <div className="postUser">
      <div className="postUser__container">
        <img
          src={profilePicture ? profilePicture : DEFAULT_PROFILE_PICTURE_URL}
          alt=""
          width="35"
          height="35"
        />
        <Link to={`/users/${username}`}>{username}</Link>
      </div>
      <button
        className="postUser__moreOptionsBtn"
        onClick={() => dispatch(togglePostOptions())}
      >
        <i className="fa-solid fa-ellipsis"></i>
      </button>
    </div>
  );
};

export default PostUser;
