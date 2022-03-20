import { IComment } from '../../../../interfaces';
import Comment from '../../../Comment/Comment';
import './PostComments.scss';

const PostComments = ({
  profilePicture,
  username,
  comment,
  postedAt,
  comments,
}: {
  profilePicture: string | undefined;
  username: string | undefined;
  comment: string | undefined;
  postedAt: string | undefined;
  comments: IComment[] | undefined;
}) => {
  return (
    <div className="postComments">
      {comment && (
        <Comment
          profilePicture={profilePicture!}
          username={username!}
          comment={comment!}
          postedAt={postedAt!}
        />
      )}

      {comments && comments.length
        ? comments.map((comment) => (
            <Comment
              profilePicture={comment.user.profilePicture}
              username={comment.user.username}
              comment={comment.comment}
              postedAt={comment.postedAt}
            />
          ))
        : null}
    </div>
  );
};

export default PostComments;
