import { useState } from 'react';
import { Link } from 'react-router-dom';
import './CommentUserAndText.scss';
const CommentUserAndText = ({ username, text }: { username: string; text: string }) => {
  const [isShowMore, setIsShowMore] = useState(true);
  const handleToggleShowMore = () => setIsShowMore(!isShowMore);
  return (
    <div className="commentUserAndText">
      <p className="commentUserAndText__text">
        <Link to={`/users/${username} `} className="commentUserAndText__usernameLink">
          {username}
        </Link>

        {text.length > 250 && isShowMore ? text.slice(0, 250) : text}

        {text.length > 250 && (
          <button
            className="commentUserAndText__showMoreBtn"
            onClick={handleToggleShowMore}
          >
            {isShowMore ? 'show more...' : 'show less'}
          </button>
        )}
      </p>
    </div>
  );
};

export default CommentUserAndText;
