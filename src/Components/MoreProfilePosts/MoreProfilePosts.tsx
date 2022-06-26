import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GET_MORE_POSTS_FROM_USER } from "../../GraphQL/Queries/postQueries";
import useFetch from "../../Hooks/useFetch";
import ProfilePosts from "../ProfilePosts/ProfilePosts";
import "./MoreProfilePosts.scss";

interface Props {
  postOwner: {
    id: string;
    username: string;
    profilePicture: {
      smallPicture: string;
    };
  };
  currentPostPagePostId: string;
}

const MoreProfilePosts = (props: Props) => {
  const [posts, setPosts] = useState([]);

  const [getMoreProfilePostsRequest, { isLoading }] = useFetch({
    query: GET_MORE_POSTS_FROM_USER,
    variables: {
      userId: props.postOwner.id,
      currentPostId: props.currentPostPagePostId,
    },
  });

  const handleGetMoreProfilePosts = async () => {
    try {
      const response = await getMoreProfilePostsRequest();
      if (response.success) {
        setPosts(response.posts);
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  useEffect(() => {
    handleGetMoreProfilePosts();
  }, [props.currentPostPagePostId]);

  return (
    <Fragment>
      {posts[0] && (
        <section className="moreProfilePosts">
          <h2 className="moreProfilePosts__title">
            More posts from{" "}
            <Link
              to={`/users/${props.postOwner.username}`}
              className="moreProfilePosts__profileLink"
            >
              {props.postOwner.username}
            </Link>
          </h2>
          <div className="moreProfilePosts__posts">
            <ProfilePosts posts={posts} isProfilePage={false} />
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default MoreProfilePosts;
