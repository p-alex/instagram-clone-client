import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GET_COMMENTS_QUERY } from "../../../../GraphQL/Queries/commentQueries";
import useFetchWithRetry from "../../../../Hooks/useFetchWithRetry";
import useRedux from "../../../../Hooks/useRedux";
import {
  errorLoadingComments,
  loadingComments,
  loadMoreComments,
  resetComments,
  setComments,
} from "../../../../Redux/CommentsSection";
import Spinner from "../../../../Ui/Spinner";
import Comment from "../../../Comment/Comment";
import PostDescription from "../PostDescription/PostDescription";
import "./PostComments.scss";

interface Props {
  postId: string;
}

const MAX_COMMENTS_PER_PAGE = 20;

const PostComments = (props: Props) => {
  const { authState, postState, commentsSectionState, dispatch } = useRedux();
  const { post } = postState;
  const [currentPage, setCurrentPage] = useState(0);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [getCommentsRequest, { isLoading }] = useFetchWithRetry({
    query: GET_COMMENTS_QUERY,
    variables: {
      postId: postState.post?.id,
      maxCommentsPerPage: MAX_COMMENTS_PER_PAGE,
      currentPage,
    },
    accessToken: authState.accessToken,
  });
  const handleGetComments = async (
    type: "initialRequest" | "requestMoreComments"
  ) => {
    dispatch(loadingComments());
    try {
      const response = await getCommentsRequest();
      if (response.success) {
        if (response.comments.length === MAX_COMMENTS_PER_PAGE) {
          setShowLoadMore(true);
        } else {
          setShowLoadMore(false);
        }
        if (type === "initialRequest") {
          dispatch(setComments(response.comments));
        } else if (type === "requestMoreComments") {
          dispatch(loadMoreComments({ comments: response.comments }));
        }
      }
    } catch (error: any) {
      dispatch(errorLoadingComments(error.message));
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (postState.post?.id && authState.accessToken)
      handleGetComments("initialRequest");
    return () => {
      dispatch(resetComments());
    };
  }, [postState.post?.id]);

  useEffect(() => {
    if (currentPage > 0) handleGetComments("requestMoreComments");
  }, [currentPage]);

  return (
    <div className="postComments">
      <div className="postComments__container">
        {post?.description && (
          <PostDescription
            profilePicture={post?.user.profilePicture.smallPicture}
            username={post?.user.username}
            description={post?.description}
            postedAt={post?.createdAt}
            showProfilePicture={true}
          />
        )}
        {isLoading && currentPage === 0 && <Spinner size="small" />}
        {commentsSectionState.comments.length
          ? authState.accessToken &&
            commentsSectionState.comments.map((comment, index) => (
              <Comment
                key={comment.id}
                postId={props.postId}
                comment={comment}
                commentIndex={index}
                isDescription={false}
              />
            ))
          : null}
        {showLoadMore && (
          <button
            onClick={() => setCurrentPage((prevState) => prevState + 1)}
            className="postComments__loadMoreCommentsBtn"
            aria-label="load more comments"
            disabled={isLoading}
          >
            Load More
          </button>
        )}
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
