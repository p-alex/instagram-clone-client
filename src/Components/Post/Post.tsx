import PostLoader from './PostComponents/PostLoader/PostLoader';
import PostImage from './PostComponents/PostImage/PostImage';
import PostPanel from './PostComponents/PostPanel/PostPanel';
import PostUser from './PostComponents/PostUser/PostUser';
import PostComments from './PostComponents/PostComments/PostComments';
import PostReact from './PostComponents/PostReact/PostReact';
import PostForm from './PostComponents/PostForm/PostForm';
import PostOptionsModal from './PostComponents/PostOptionsModal/PostOptionsModal';
import useRedux from '../../Hooks/useRedux';
import './Post.scss';

const Post = () => {
  const { authState, postState } = useRedux();
  const { post, isLoading } = postState;
  return (
    <article className="post">
      {isLoading && <PostLoader />}
      <PostImage imageUrl={post?.images[0].fullImage.url} />
      <PostPanel>
        <PostUser
          username={post?.user.username}
          profilePicture={post?.user.profilePicture}
        />
        <PostComments
          profilePicture={post?.user.profilePicture}
          username={post?.user.username}
          description={post?.description}
          postedAt={post?.postedAt}
        />
        <PostReact />
        {authState.accessToken && <PostForm />}
      </PostPanel>
      {postState.isPostOptionsActive && <PostOptionsModal />}
    </article>
  );
};

export default Post;
