import { useContext } from 'react';
import { CreateModalContext } from '../../../Context/CreateModalContext';
import FocusTrapRedirectFocus from '../../FocusTrap';
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
  const { firstFocusableElementRef, lastFocusableElementRef } =
    useContext(CreateModalContext);
  return (
    <div className="createModal__topBar">
      <FocusTrapRedirectFocus element={lastFocusableElementRef} />
      <div className="createModal__leftSideBtns">
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
      </div>

      <h2 className="createModal__title">{title}</h2>

      <div className="createModal__rightSideBtns">
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
    </div>
  );
};

export default CreatePostTopBar;
