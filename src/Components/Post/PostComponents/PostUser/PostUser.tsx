import { DEFAULT_PROFILE_PICTURE_URL } from '../../../../default-profile-pic-url';
import './PostUser.scss';

const PostUser = ({
  username,
  profilePicture,
}: {
  username: string | undefined;
  profilePicture: string | undefined;
}) => (
  <div className="postUser">
    <div className="postUser__container">
      <img
        src={profilePicture ? profilePicture : DEFAULT_PROFILE_PICTURE_URL}
        alt=""
        width="35"
        height="35"
      />
      <p>{username}</p>
    </div>
    <button className="postUser__moreOptionsBtn">
      <i className="fa-solid fa-ellipsis"></i>
    </button>
  </div>
);

export default PostUser;
