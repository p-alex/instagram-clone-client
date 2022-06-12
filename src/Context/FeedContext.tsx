import { createContext, useEffect, useState } from "react";

export const FeedContext = createContext({
  isPostModalActive: false,
  handleTogglePostModal: () => {},
  selectedPostId: "",
  handleSelectPost: (postId: string) => {},
});

const FeedContextProvider = ({ children }: { children: any }) => {
  const [selectedPostId, setSelectedPostId] = useState("");
  const [isPostModalActive, setIsPostModalActive] = useState(false);
  const handleTogglePostModal = () => {
    setIsPostModalActive(false);
  };
  const handleSelectPost = (postId: string) => {
    setSelectedPostId(postId);
    setIsPostModalActive(true);
  };
  useEffect(() => {
    if (!isPostModalActive) setSelectedPostId("");
  }, [isPostModalActive]);
  return (
    <FeedContext.Provider
      value={{
        isPostModalActive,
        handleTogglePostModal,
        selectedPostId,
        handleSelectPost,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
};

export default FeedContextProvider;
