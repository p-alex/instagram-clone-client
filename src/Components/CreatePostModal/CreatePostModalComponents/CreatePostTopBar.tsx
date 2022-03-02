import { useContext } from 'react';
import { CreateModalContext } from '../../../Context/CreateModalContext';
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
  const { firstFocusableElementRef, lastFocusableElementRef, handleFocusTrap } =
    useContext(CreateModalContext);
  return (
    <div className="createModal__topBar">
      <div
        id="topFocusTrap"
        tabIndex={0}
        onFocus={() => handleFocusTrap('topTrap')}
      ></div>
      {step === 2 && (
        <button
          className="createModal__btn"
          onClick={handleDiscard}
          ref={firstFocusableElementRef}
        >
          Discard
        </button>
      )}

      {step === 3 && (
        <button
          className="createModal__btn"
          onClick={() => handleSteps('prev')}
          ref={firstFocusableElementRef}
        >
          Back
        </button>
      )}

      <h2 className="createModal__title">{title}</h2>

      {(step === 1 || (step === 4 && !isLoading)) && (
        <button
          className="createModal__btn"
          onClick={() => {
            handleDiscard();
            handleToggleCreatePostModal();
          }}
          ref={firstFocusableElementRef}
        >
          Close
        </button>
      )}

      {step === 2 && (
        <button
          className="createModal__btn"
          onClick={() => handleSteps('next')}
          ref={lastFocusableElementRef}
        >
          Next
        </button>
      )}

      {step === 3 && (
        <button className="createModal__btn" onClick={(event) => handleSubmit(event)}>
          Share
        </button>
      )}
    </div>
  );
};

export default CreatePostTopBar;
