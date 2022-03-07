import { Link } from 'react-router-dom';
import { DEFAULT_PROFILE_PICTURE_URL } from '../../default-profile-pic-url';
import './Comment.scss';

const Comment = ({
  profilePicture,
  username,
  description,
  postedAt,
}: {
  profilePicture: string;
  username: string;
  description?: string;
  postedAt: number | string;
}) => {
  return (
    <div className="comment">
      <img
        src={profilePicture ? profilePicture : DEFAULT_PROFILE_PICTURE_URL}
        alt=""
        width="35"
        height="35"
        className="comment__profileImg"
      />
      <div className="comment__body">
        <div className="comment__usernameAndText">
          <p className="comment__text">
            <Link to={`/users/${username} `} className="comment__usernameLink">
              {username}
            </Link>{' '}
            {description}
          </p>
        </div>

        <small className="comment__postedAt">{postedAt}</small>
      </div>
    </div>
  );
};

export default Comment;
