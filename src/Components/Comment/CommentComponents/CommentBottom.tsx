import { ILikes } from '../../../interfaces';
import { dateConverter } from '../../../Util/dateConverter';

const CommentBottom = ({
  postedAt,
  likes,
  isDescription,
}: {
  postedAt: string | undefined;
  likes: ILikes | undefined;
  isDescription: boolean;
}) => {
  return (
    <div className="comment__bottom">
      <small className="comment__postedAt">
        {postedAt && dateConverter(parseInt(postedAt))}
      </small>
      {!isDescription && likes!.count > 0 && (
        <small>
          {likes?.count} {likes?.count === 1 ? 'like' : 'likes'}
        </small>
      )}
      <button className="comment__optionsToggle">
        <i className="fa-solid fa-ellipsis"></i>
      </button>
    </div>
  );
};

export default CommentBottom;
