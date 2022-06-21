import { useContext, useEffect, useState, Fragment } from "react";
import { FeedContext } from "../../Context/FeedContext";
import { GET_FEED_POSTS } from "../../GraphQL/Queries/postQueries";
import useFetchWithRetry from "../../Hooks/useFetchWithRetry";
import useRedux from "../../Hooks/useRedux";
import { addMoreFeedPosts, setFeedPosts } from "../../Redux/Feed";
import Spinner from "../../Ui/Spinner";
import PostModal from "../PostModal/PostModal";
import SuggestionsSlider from "../SuggestionsSlider/SuggestionsSlider";
import "./Feed.scss";
import FeedPost from "./FeedPost/FeedPost";

const MAX_POSTS_PER_PAGE = 10;

const Feed = () => {
  const { authState, feedState, dispatch } = useRedux();
  const { isPostModalActive, selectedPostId, handleTogglePostModal } =
    useContext(FeedContext);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const [showLoadMore, setShowLoadMore] = useState(false);

  const [getFeedPostsRequest, { isLoading, error }] = useFetchWithRetry({
    query: GET_FEED_POSTS,
    variables: { currentPage, maxPostsPerPage: MAX_POSTS_PER_PAGE },
    accessToken: authState.accessToken,
  });

  const handleGetPosts = async (
    type: "initialRequest" | "requestMorePosts"
  ) => {
    try {
      const response = await getFeedPostsRequest();
      if (!response.success) throw new Error(response.message);
      if (response.posts.length === MAX_POSTS_PER_PAGE) {
        setShowLoadMore(true);
      } else {
        setShowLoadMore(false);
      }
      if (type === "initialRequest") {
        dispatch(setFeedPosts({ posts: response.posts }));
      } else if (type === "requestMorePosts") {
        dispatch(addMoreFeedPosts({ posts: response.posts }));
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (!feedState.requestedOnce) handleGetPosts("initialRequest");
  }, []);

  useEffect(() => {
    if (currentPage > 0) handleGetPosts("requestMorePosts");
  }, [currentPage]);

  return (
    <section className="feed">
      {error && <p>{error}</p>}
      {isLoading && <Spinner size="small" />}
      {feedState.posts.length === 0 && <SuggestionsSlider />}
      {feedState.posts &&
        feedState.posts.map((post, index) => {
          if (feedState.posts.length > 2 && index === 1) {
            return (
              <Fragment key={post.id}>
                <FeedPost post={post} postIndex={index} />
                <SuggestionsSlider />
              </Fragment>
            );
          } else if (feedState.posts.length <= 2 && index === 0) {
            return (
              <Fragment key={post.id}>
                <SuggestionsSlider />
                <FeedPost post={post} postIndex={index} />
              </Fragment>
            );
          }
          return <FeedPost key={post.id} post={post} postIndex={index} />;
        })}
      {showLoadMore && (
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className="feed__loadMoreBtn"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Load More"}
        </button>
      )}
      {isPostModalActive && (
        <PostModal
          postId={selectedPostId}
          isProfileModal={false}
          handleTogglePostModal={handleTogglePostModal}
        />
      )}
    </section>
  );
};

export default Feed;
