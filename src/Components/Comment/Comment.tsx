import useRedux from "../../Hooks/useRedux";
import { IComment } from "../../interfaces";
import "./Comment.scss";
import CommentBottom from "./CommentComponents/CommentBottom/CommentBottom";
import CommentLikeBtn from "./CommentComponents/CommentLikeBtn/CommentLikeBtn";
import CommentOptions from "./CommentComponents/CommentOptions/CommentOptions";
import CommentUserAndText from "./CommentComponents/CommentUserAndText/CommentUserAndText";

const Comment = ({
  comment,
  commentIndex,
  isDescription,
}: {
  comment: IComment;
  commentIndex: number;
  isDescription: boolean;
}) => {
  const { commentsSectionState } = useRedux();
  return (
    <div className="comment">
      {commentsSectionState.isCommentOptionsActive &&
        commentsSectionState.selectedCommentId === comment.id && (
          <CommentOptions
            commentId={comment.id}
            commentUserId={comment.user.id}
          />
        )}
      <div className="comment__container">
        <img
          src={comment.user.profilePicture}
          alt=""
          width="30"
          height="30"
          className="comment__profileImg"
        />
        <div className="comment__body">
          <CommentUserAndText
            username={comment.user.username}
            text={comment.comment}
          />
          {!isDescription && (
            <CommentBottom
              commentId={comment.id}
              postedAt={comment.createdAt}
              likes={comment.likes}
            />
          )}
        </div>
      </div>
      {!isDescription && (
        <CommentLikeBtn
          isReply={false}
          commentId={comment.id}
          replyId={""}
          commentIndex={commentIndex}
          likes={comment.likes}
        />
      )}
    </div>
  );
};

export default Comment;
