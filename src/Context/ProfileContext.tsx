import { useState, useEffect, createContext } from 'react';
import useAxios from '../Hooks/useAxios';
import { IPost, IUser } from '../interfaces';
import { useParams } from 'react-router-dom';
import { GET_USER_QUERY } from '../GraphQL/Queries/userQueries';

const ProfileContext = createContext<{
  profileData: IUser | null;
  profilePosts: IPost[] | undefined;
  isPostModalActive: boolean;
  setIsPostModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPostId: string | null;
  setSelectedPostId: React.Dispatch<React.SetStateAction<string | null>>;
  isLoading: boolean;
  error: string;
}>({
  profileData: null,
  profilePosts: [],
  isPostModalActive: false,
  setIsPostModalActive: () => {},
  selectedPostId: '',
  setSelectedPostId: () => {},
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
  }, [params]);

  return (
    <ProfileContext.Provider
      value={{
        profileData,
        profilePosts: profileData?.posts.postsList,
        isPostModalActive,
        setIsPostModalActive,
        selectedPostId,
        setSelectedPostId,
        isLoading,
        error,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export { ProfileContextProvider, ProfileContext };
