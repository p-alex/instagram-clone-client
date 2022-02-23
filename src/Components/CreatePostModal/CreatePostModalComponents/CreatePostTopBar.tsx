const CreatePostTopBar = ({
  step,
  isLoading,
  handleSteps,
  handleDiscard,
  handleToggleCreatePostModal,
  title,
  handleSubmit,
}: {
  step: number;
  isLoading: boolean;
  handleSteps: any;
  handleDiscard: () => void;
  handleToggleCreatePostModal: () => void;
  title: string;
  handleSubmit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
  return (
    <div className="createModal__topBar">
      {step === 3 && (
        <button className="createModal__btn" onClick={() => handleSteps('prev')}>
          Back
        </button>
      )}

      {step === 2 && (
        <button className="createModal__btn" onClick={handleDiscard}>
          Discard
        </button>
      )}

      <h2 className="createModal__title">{title}</h2>

      {step === 2 && (
        <button className="createModal__btn" onClick={() => handleSteps('next')}>
          Next
        </button>
      )}

      {step === 3 && (
        <button className="createModal__btn" onClick={(event) => handleSubmit(event)}>
          Share
        </button>
      )}

      {step === 4 && !isLoading && (
        <button
          className="createModal__btn"
          onClick={() => {
            handleDiscard();
            handleToggleCreatePostModal();
          }}
        >
          Close
        </button>
      )}
    </div>
  );
};

export default CreatePostTopBar;
