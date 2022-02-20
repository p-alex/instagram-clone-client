import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreatePost from '../../Components/CreatePost/CreatePost';
import NavBar from '../../Components/NavBar/NavBar';
import { AppContext } from '../../Context/Context';
import useAxiosWithRetry from '../../Hooks/useAxiosWithRetry';

const GET_POSTS = `
{
  getPosts {
    statusCode
    success
    message
    posts {
      id
      description
    }
  }
}
`;

interface IGetPosts {
  statusCode: number;
  success: boolean;
  message: string;
  posts: [] | null;
}

const Home = () => {
  const { user } = useContext(AppContext);
  const [posts, setPosts] = useState([]);
  const [getPostsRequest, { isLoading, error }] = useAxiosWithRetry(GET_POSTS, {});
  const navigate = useNavigate();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await getPostsRequest();
        setPosts(data.posts);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    if (user.userId && posts.length === 0) {
      getPosts();
    }
  }, []);

  useEffect(() => {
    if (!user.userId) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <>
      <NavBar />
      <CreatePost />
    </>
  );
};

export default Home;
