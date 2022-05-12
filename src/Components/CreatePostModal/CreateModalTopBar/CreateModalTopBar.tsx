import { SetStateAction, Dispatch, useEffect } from "react";
import { STAGES } from "../CreatePostModal";
import "./CreateModalTopBar.scss";

interface Props {
  currentStage: { index: number; name: string };
  handleNavigateStages: (direction: "previous" | "next") => void;
  handleCloseModal: () => void;
  handleRequest: () => void;
  firstFocusableElementRef: React.MutableRefObject<any>;
}

const CreateModalTopBar = (props: Props) => {
  useEffect(() => {
    if (props.currentStage.name === "Crop")
      props.firstFocusableElementRef.current.focus();
  }, [props.currentStage.name]);
  return (
    <div className="createModalTopBar">
      {(props.currentStage.index === 0 ||
        props.currentStage.index === STAGES.length - 1) && (
        //====== Close btn ======
        <button
          className="createModalTopBar__btn close-btn"
          onClick={props.handleCloseModal}
          ref={props.firstFocusableElementRef}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      )}
      {props.currentStage.index >= 1 &&
        props.currentStage.index < STAGES.indexOf("Loading") && (
          <button
            className="createModalTopBar__btn"
            onClick={() => props.handleNavigateStages("previous")}
            ref={props.firstFocusableElementRef}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
        )}

      <p
        className="createModalTopBar__title"
        ref={
          props.currentStage.name === "Loading"
            ? props.firstFocusableElementRef
            : null
        }
        tabIndex={props.currentStage.name === "Loading" ? 0 : 1}
      >
        {props.currentStage.name}
      </p>

      {props.currentStage.index >= 1 &&
        props.currentStage.index < STAGES.indexOf("Details") && (
          <button
            className="createModalTopBar__btn"
            onClick={() => props.handleNavigateStages("next")}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        )}
      {props.currentStage.name === "Details" && (
        //====== Check btn ======
        <button
          className="createModalTopBar__btn"
          onClick={props.handleRequest}
        >
          <i className="fa-solid fa-check"></i>
        </button>
      )}
    </div>
  );
};

export default CreateModalTopBar;
