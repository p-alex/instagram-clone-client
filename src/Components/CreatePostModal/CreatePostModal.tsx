import { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { NavBarContext } from "../../Context/NavBarContext";
import { CREATE_POST_MUTATION } from "../../GraphQL/Mutations/postMutations";
import useFetchWithRetry from "../../Hooks/useFetchWithRetry";
import { RootState } from "../../Redux/Store";
import ChooseFileStage from "./ChooseFileStage/ChooseFileStage";
import CreateModalTopBar from "./CreateModalTopBar/CreateModalTopBar";
import CropStage from "./CropStage/CropStage";
import DetailsStage from "./DetailsStage/DetailsStage";
import FocusTrapRedirectFocus from "./FocusTrap";
import LoadingStage from "./LoadingStage/LoadingStage";
import ResultStage from "./ResultStage/ResultStage";

import "./CreatePostModal.scss";

export const STAGES = ["Choose File", "Crop", "Details", "Loading", "Result"];

const CreatePostModal = () => {
  const authState = useSelector((state: RootState) => state.auth);
  const { handleToggleCreatePostModal } = useContext(NavBarContext);

  const [currentStage, setCurrentStage] = useState({
    index: 0,
    name: "Choose File",
  });
  const [optimizedImageUrl, setOptimizedImageUrl] = useState("");
  const [croppedImageUrl, setCroppedImageUrl] = useState("");
  const [savedImagePos, setSavedImagePos] = useState({ x: 0, y: 0 });
  const [savedAspectRatio, setSavedAspectRatio] = useState(1 / 1);
  const [caption, setCaption] = useState("");

  const [createPost, { isLoading, error }] = useFetchWithRetry({
    query: CREATE_POST_MUTATION,
    variables: {
      caption,
      image: croppedImageUrl,
      aspectRatio: savedAspectRatio,
    },
    accessToken: authState.accessToken,
  });

  const handleRequest = async () => {
    handleNavigateStages("next");
    const response = await createPost();
    if (response.message) handleNavigateStages("next");
  };

  const firstFocusableElementRef = useRef<any>();
  const lastFocusableElementRef = useRef<any>();

  useEffect(() => {
    document.body.style.cssText = `overflow-y:hidden`;
    return () => {
      document.body.removeAttribute("style");
    };
  }, []);

  useEffect(() => {
    if (currentStage.index === 0) {
      setOptimizedImageUrl("");
      setCroppedImageUrl("");
      setSavedImagePos({ x: 0, y: 0 });
      setSavedAspectRatio(1 / 1);
    }
  }, [currentStage.index]);

  useEffect(() => {
    if (optimizedImageUrl) handleNavigateStages("next");
  }, [optimizedImageUrl]);

  const handleCloseModal = () => {
    if (!isLoading) handleToggleCreatePostModal();
  };

  const handleNavigateStages = (direction: "previous" | "next") => {
    setCurrentStage((prevStage) => ({
      ...prevStage,
      index:
        direction === "previous" ? prevStage.index - 1 : prevStage.index + 1,
      name:
        direction === "previous"
          ? STAGES[prevStage.index - 1]
          : STAGES[prevStage.index + 1],
    }));
  };

  return (
    <div className="createPostModal">
      <FocusTrapRedirectFocus element={lastFocusableElementRef} />
      <div
        className="createPostModal__backdrop"
        onClick={handleCloseModal}
      ></div>
      <div className="createPostModal__container">
        <CreateModalTopBar
          currentStage={currentStage}
          handleNavigateStages={handleNavigateStages}
          handleCloseModal={handleCloseModal}
          handleRequest={handleRequest}
          firstFocusableElementRef={firstFocusableElementRef}
        />
        <div className="createPostModal__body">
          {currentStage.name === "Choose File" && (
            <ChooseFileStage
              setOptimizedImageUrl={setOptimizedImageUrl}
              lastFocusableElementRef={lastFocusableElementRef}
            />
          )}
          {currentStage.name === "Crop" && (
            <CropStage
              imgUrl={optimizedImageUrl}
              savedImagePos={savedImagePos}
              savedAspectRatio={savedAspectRatio}
              setCroppedImageUrl={setCroppedImageUrl}
              setSavedImagePos={setSavedImagePos}
              setSavedAspectRatio={setSavedAspectRatio}
              lastFocusableElementRef={lastFocusableElementRef}
            />
          )}
          {currentStage.name === "Details" && (
            <DetailsStage
              croppedImageUrl={croppedImageUrl}
              description={caption}
              setDescription={setCaption}
              lastFocusableElement={lastFocusableElementRef}
            />
          )}
          {currentStage.name === "Loading" && (
            <LoadingStage lastFocusableElementRef={lastFocusableElementRef} />
          )}
          {currentStage.name === "Result" && (
            <ResultStage
              error={error}
              lastFocusableElementRef={lastFocusableElementRef}
            />
          )}
        </div>
      </div>
      <FocusTrapRedirectFocus element={firstFocusableElementRef} />
    </div>
  );
};

export default CreatePostModal;
