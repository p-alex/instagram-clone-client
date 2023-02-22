import Layout from '../../Layout/Layout';
import Post from '../../Components/Post/Post';
import './PostPage.scss';
import { GET_POST_QUERY } from '../../GraphQL/Queries/postQueries';
import { useParams } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import { useEffect, useState } from 'react';
import useRedux from '../../Hooks/useRedux';
import { loadingPost, loadingPostError, resetPostState, setPost } from '../../Redux/Post';
import { ILiteUser, IPost } from '../../interfaces';
import MoreProfilePosts from '../../Components/MoreProfilePosts/MoreProfilePosts';
import { Helmet } from 'react-helmet';

const PostPage = () => {
  const params = useParams();
  const { authState } = useRedux();
  const [postOwner, setPostOwner] = useState<ILiteUser>();
  const [getPost, { error }] = useFetch({
    query: GET_POST_QUERY,
  });
  const { dispatch } = useRedux();

  const handleGetPost = async () => {
    try {
      dispatch(loadingPost());
      const response: {
        statusCode: number;
        success: boolean;
        message: string;
        post: IPost;
      } = await getPost({ postId: params.postId, userId: authState.user?.id });
      if (response.success) {
        dispatch(setPost({ ...response.post }));
        setPostOwner(response.post.user);
      }
      dispatch(loadingPostError(error));
    } catch (error: any) {
      dispatch(loadingPostError('Something went wrong...'));
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    handleGetPost();
    return () => {
      dispatch(resetPostState());
    };
  }, [params.postId]);

  return (
    <>
      <Layout>
        <Post />
        {postOwner && (
          <MoreProfilePosts
            currentPostPagePostId={params.postId!}
            postOwner={postOwner}
          />
        )}
      </Layout>
    </>
  );
};

export default PostPage;
