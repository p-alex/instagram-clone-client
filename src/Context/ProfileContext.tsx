import { useState, useEffect, createContext } from 'react';
import useAxios from '../Hooks/useAxios';
import { IPost, IUser } from '../interfaces';
import { useParams } from 'react-router-dom';
import { GET_USER_QUERY } from '../GraphQL/Queries/userQueries';

interface IProfileContext {
  profileData: IUser | null;
  profilePosts: IPost[] | undefined;
  isPostModalActive: boolean;
  setIsPostModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPostId: string | null;
  setSelectedPostId: React.Dispatch<React.SetStateAction<string | null>>;
  handleClosePostModal: () => void;
  lastFocusedPostIndex: number | null;
  setLastFocusedPostIndex: React.Dispatch<React.SetStateAction<number | null>>;
  isLoading: boolean;
  error: string;
}

const ProfileContext = createContext<IProfileContext>({
  profileData: null,
  profilePosts: [],
  isPostModalActive: false,
  setIsPostModalActive: () => {},
  selectedPostId: '',
  setSelectedPostId: () => {},
  handleClosePostModal: () => {},
  lastFocusedPostIndex: 0,
  setLastFocusedPostIndex: () => {},
  isLoading: false,
  error: '',
});

const ProfileContextProvider = ({ children }: { children: any }) => {
  const params = useParams();

  const [getProfile, { isLoading, error }] = useAxios({
    query: GET_USER_QUERY,
    variables: {
      username: params.username,
    },
  });

  const [profileData, setProfileData] = useState<IUser | null>(null);

  const [isPostModalActive, setIsPostModalActive] = useState(false);

  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const [lastFocusedPostIndex, setLastFocusedPostIndex] = useState<number | null>(null);

  const handleClosePostModal = () => {
    setSelectedPostId(null);
    const lastFocusedPost = document.querySelector(
      `#profile-post-${lastFocusedPostIndex}`
    ) as HTMLButtonElement;
    lastFocusedPost.focus();
  };

  const handleGetProfileData = async () => {
    try {
      const response = await getProfile();
      if (response.user) {
        setProfileData(response.user);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    handleGetProfileData();
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        profileData,
        profilePosts: profileData?.posts.postsList,
        isPostModalActive,
        setIsPostModalActive,
        selectedPostId,
        setSelectedPostId,
        handleClosePostModal,
        lastFocusedPostIndex,
        setLastFocusedPostIndex,
        isLoading,
        error,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export { ProfileContextProvider, ProfileContext };
