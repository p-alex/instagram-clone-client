import useRedux from '../../../../Hooks/useRedux';
import { ILikes } from '../../../../interfaces';
import { toggleCommentOptions } from '../../../../Redux/CommentsSection';
import { dateConverter } from '../../../../Util/dateConverter';
import './CommentBottom.scss';

const CommentBottom = ({
  commentId,
  likes,
  postedAt,
}: {
  commentId: string;
  likes: ILikes;
  postedAt: string;
}) => {
  const { dispatch } = useRedux();

  return (
    <div className="commentBottom">
      <small className="commentBottom__postedAt">
        {dateConverter(parseInt(postedAt))}
      </small>

      {likes.count > 0 && (
        <small>
          {likes.count} {likes.count === 1 ? 'like' : 'likes'}
        </small>
      )}

      <button
        className="commentBottom__optionsToggle"
        onClick={() => dispatch(toggleCommentOptions(commentId))}
      >
        <i className="fa-solid fa-ellipsis"></i>
      </button>
    </div>
  );
};

export default CommentBottom;
