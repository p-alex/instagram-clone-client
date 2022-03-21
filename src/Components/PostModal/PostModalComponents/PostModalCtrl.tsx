const PostModalCtrl = ({
  direction,
  handleNavigatePosts,
}: {
  direction: 'prev' | 'next';
  handleNavigatePosts: (direction: 'prev' | 'next') => void;
}) => {
  return (
    <button
      className={`postModal__ctrl ctrl--${direction}`}
      onClick={() => handleNavigatePosts(direction)}
    >
      <i className={`fa-solid fa-chevron-${direction}`}></i>
    </button>
  );
};

export default PostModalCtrl;
