import Layout from '../../Layout/Layout';
import Post from '../../Components/Post/Post';
import './PostPage.scss';
import { GET_POST_QUERY } from '../../GraphQL/Queries/postQueries';
import { useParams } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import { useEffect } from 'react';
import useRedux from '../../Hooks/useRedux';
import { loadingPost, loadingPostError, resetPostState, setPost } from '../../Redux/Post';
import { IPost } from '../../interfaces';

const PostPage = () => {
  const params = useParams();
  const { postState } = useRedux();
  const [getPost, { error }] = useFetch({
    query: GET_POST_QUERY,
    variables: { postId: params.postId },
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
      } = await getPost();
      if (response.success) return dispatch(setPost({ ...response.post }));
      dispatch(loadingPostError(error));
    } catch (error: any) {
      dispatch(loadingPostError('Something went wrong...'));
    }
  };

  useEffect(() => {
    if (!postState.post?.id) handleGetPost();
    return () => {
      dispatch(resetPostState());
    };
  }, []);

  return (
    <>
      <Layout>
        <Post />
      </Layout>
    </>
  );
};

export default PostPage;
