import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_PROFILE_PICTURE_URL } from '../../default-profile-pic-url';
import { ILikes } from '../../interfaces';
import './Comment.scss';
import CommentBottom from './CommentComponents/CommentBottom';
import CommentLikeBtn from './CommentComponents/CommentLikeBtn';

const Comment = ({
  commentId,
  commentIndex,
  profilePicture,
  username,
  comment,
  likes,
  postedAt,
  isDescription,
}: {
  commentId?: string | undefined;
  commentIndex?: number;
  profilePicture: string | undefined;
  username: string | undefined;
  comment: string | undefined;
  likes?: ILikes;
  postedAt: string | undefined;
  isDescription: boolean;
}) => {
  const [isShowMore, setIsShowMore] = useState(false);
  const handleToggleShowMore = () => setIsShowMore(!isShowMore);
  return (
    <div className="comment">
      <div className="comment__container">
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
              {comment && comment.length > 250 && isShowMore
                ? comment.slice(0, 250)
                : comment}
              {comment && comment.length > 250 && (
                <button className="comment__showMoreBtn" onClick={handleToggleShowMore}>
                  {isShowMore ? 'show more...' : 'show less'}
                </button>
              )}
            </p>
          </div>
          <CommentBottom
            postedAt={postedAt}
            likes={likes}
            isDescription={isDescription}
          />
        </div>
      </div>
      {!isDescription && (
        <CommentLikeBtn
          commentId={commentId!}
          commentIndex={commentIndex!}
          likes={likes}
        />
      )}
    </div>
  );
};

export default Comment;
