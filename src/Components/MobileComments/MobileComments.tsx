import { useEffect, useState } from "react";
import { GET_COMMENTS_QUERY } from "../../GraphQL/Queries/commentQueries";
import useFetchWithRetry from "../../Hooks/useFetchWithRetry";
import useRedux from "../../Hooks/useRedux";
import { loadMoreComments, setComments } from "../../Redux/CommentsSection";
import Comment from "../Comment/Comment";
import PostDescription from "../Post/PostComponents/PostDescription/PostDescription";
import PostForm from "../Post/PostComponents/PostForm/PostForm";
import "./MobileComments.scss";

interface Props {
  postId: string;
  postOwner: {
    id: string;
    username: string;
    profilePicture: {
      smallPicture: string;
    };
  };
  postDescription: string;
  postedAt: string;
  handleToggleMobileComments: () => void;
}

const MAX_COMMENTS_PER_PAGE = 20;

const MobileComments = (props: Props) => {
  const { authState, commentsSectionState, dispatch } = useRedux();

  const [currentPage, setCurrentPage] = useState(0);
  const [showLoadMore, setShowLoadMore] = useState(false);

  const [getCommentsRequest, { isLoading, error }] = useFetchWithRetry({
    query: GET_COMMENTS_QUERY,
    variables: {
      postId: props.postId,
      currentPage,
      maxCommentsPerPage: MAX_COMMENTS_PER_PAGE,
    },
    accessToken: authState.accessToken,
  });

  const handleGetComments = async (
    type: "initialRequest" | "requestMoreComments"
  ) => {
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
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (props.postId && authState.accessToken)
      handleGetComments("initialRequest");
  }, []);

  useEffect(() => {
    if (currentPage > 0) handleGetComments("requestMoreComments");
  }, [currentPage]);

  useEffect(() => {
    document.body.style.cssText = `overflow-y:hidden`;
    return () => {
      document.body.removeAttribute("style");
    };
  }, []);

  useEffect(() => {
    function checkWindowSize() {
      if (window.innerWidth > 980) {
        props.handleToggleMobileComments();
      }
    }
    window.addEventListener("resize", checkWindowSize);
    return () => {
      window.removeEventListener("resize", checkWindowSize);
    };
  }, []);

  return (
    <div className="mobileComments">
      <div
        className="mobileComments__backdrop"
        onClick={props.handleToggleMobileComments}
      ></div>
      <div className="mobileComments__container">
        <header className="mobileComments__header">
          <button
            className="mobileComments__closeBtn"
            onClick={props.handleToggleMobileComments}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
          <h2>Comments</h2>
        </header>
        <div className="mobileComments__handle">
          <div className="mobileComments__handleGrab"></div>
        </div>

        <div className="mobileComments__comments">
          <div className="mobileComments__commentsContainer">
            {props.postDescription && (
              <div className="mobileComments__description">
                <PostDescription
                  description={props.postDescription}
                  postedAt={props.postedAt}
                  profilePicture={props.postOwner.profilePicture.smallPicture}
                  username={props.postOwner.username}
                  showProfilePicture={true}
                />
              </div>
            )}
            {commentsSectionState.comments.map((comment, index) => {
              return (
                <Comment
                  key={comment.id}
                  postId={props.postId}
                  comment={comment}
                  commentIndex={index}
                  isDescription={false}
                />
              );
            })}
            {showLoadMore && (
              <button
                onClick={() => setCurrentPage((prevState) => prevState + 1)}
                className="mobileComments__loadMoreCommentsBtn"
                aria-label="load more comments"
                disabled={isLoading}
              >
                Load More
              </button>
            )}
          </div>
        </div>

        <PostForm postId={props.postId} />
      </div>
    </div>
  );
};

export default MobileComments;
