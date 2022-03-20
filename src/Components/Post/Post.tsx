import PostComments from './PostComponents/PostComments/PostComments';
import PostForm from './PostComponents/PostForm/PostForm';
import PostImage from './PostComponents/PostImage/PostImage';
import PostReact from './PostComponents/PostReact/PostReact';
import PostUser from './PostComponents/PostUser/PostUser';
import './Post.scss';
import useRedux from '../../Hooks/useRedux';

const Post = () => {
  const { postState } = useRedux();
  const post = postState.post;
  return (
    <article className="post">
      {postState.isLoading && <p>Loading...</p>}
      {!postState.isLoading && (
        <>
          <PostImage imageUrl={post?.images[0].fullImage} />
          <div className="post__panel">
            <PostUser
              username={post?.user.username}
              profilePicture={post?.user.profilePicture}
            />
            <PostComments
              profilePicture={post?.user.profilePicture}
              username={post?.user.username}
              comment={post?.description}
              postedAt={post?.postedAt}
              comments={post?.comments.commentsList}
            />
            <PostReact likesCount={post?.likes.count} postedAt={post?.postedAt} />
            <PostForm />
          </div>
        </>
      )}
    </article>
  );
};

export default Post;
