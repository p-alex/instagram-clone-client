import { useEffect } from "react";
import { Link } from "react-router-dom";
import { GET_COMMENTS_QUERY } from "../../../../GraphQL/Queries/commentQueries";
import useFetchWithRetry from "../../../../Hooks/useFetchWithRetry";
import useRedux from "../../../../Hooks/useRedux";
import {
  errorLoadingComments,
  loadingComments,
  resetComments,
  setComments,
} from "../../../../Redux/CommentsSection";
import Comment from "../../../Comment/Comment";
import PostDescription from "../PostDescription/PostDescription";
import "./PostComments.scss";

const PostComments = () => {
  const { authState, postState, commentsSectionState, dispatch } = useRedux();
  const { post } = postState;
  const [getCommentsRequest, { isLoading }] = useFetchWithRetry({
    query: GET_COMMENTS_QUERY,
    variables: { postId: postState.post?.id },
    accessToken: authState.accessToken,
  });
  const handleGetComments = async () => {
    dispatch(loadingComments());
    try {
      const response = await getCommentsRequest();
      if (response.success) dispatch(setComments(response.comments));
    } catch (error: any) {
      dispatch(errorLoadingComments(error.message));
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (postState.post?.id && authState.accessToken) handleGetComments();
    return () => {
      dispatch(resetComments());
    };
  }, [postState.post?.id]);

  return (
    <div className="postComments">
      <div className="postComments__container">
        {post?.description && (
          <PostDescription
            profilePicture={post?.user.profilePicture}
            username={post?.user.username}
            description={post?.description}
            postedAt={post?.createdAt}
          />
        )}
        {isLoading && currentPage === 0 && <Spinner size="small" />}
        {commentsSectionState.comments.length
          ? !isLoading &&
            authState.accessToken &&
            commentsSectionState.comments.map((comment, index) => (
              <Comment
                key={comment.id}
                comment={comment}
                commentIndex={index}
                isDescription={false}
              />
            ))
          : null}
        {!authState.accessToken && (
          <p className="postComments__loginMessage">
            <Link to="/login">Login</Link> to see comments.
          </p>
        )}
      </div>
    </div>
  );
};

export default PostComments;
