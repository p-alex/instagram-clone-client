import PostLoader from './PostComponents/PostLoader/PostLoader';
import PostImage from './PostComponents/PostImage/PostImage';
import PostPanel from './PostComponents/PostPanel/PostPanel';
import PostUser from './PostComponents/PostUser/PostUser';
import PostComments from './PostComponents/PostComments/PostComments';
import PostReact from './PostComponents/PostReact/PostReact';
import PostForm from './PostComponents/PostForm/PostForm';
import PostOptions from './PostComponents/PostOptions/PostOptions';
import useRedux from '../../Hooks/useRedux';
import './Post.scss';
import { useEffect } from 'react';
import { changePostFormToNewComment } from '../../Redux/Post';

const Post = () => {
  const { authState, postState, dispatch } = useRedux();
  const { post, isLoading } = postState;
  useEffect(() => {
    dispatch(changePostFormToNewComment());
  }, []);
  return (
    <article className="post">
      {isLoading && <PostLoader />}
      <PostImage imageUrl={post?.images[0].fullImage.url} />
      <PostPanel>
        <PostUser
          username={post?.user.username}
          profilePicture={post?.user.profilePicture}
        />
        <PostComments />
        <PostReact />
        {authState.accessToken && <PostForm />}
      </PostPanel>
      {postState.isPostOptionsActive && <PostOptions />}
    </article>
  );
};

export default Post;
