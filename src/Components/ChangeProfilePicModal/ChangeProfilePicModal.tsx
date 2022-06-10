import { useCallback, useEffect, useRef, useState } from "react";
import {
  CHANGE_PROFILE_PICTURE_MUTATION,
  REMOVE_PROFILE_PICTURE_MUTATION,
} from "../../GraphQL/Mutations/userMutations";
import useFetchWithRetry from "../../Hooks/useFetchWithRetry";
import useRedux from "../../Hooks/useRedux";
import { changeProfilePicture } from "../../Redux/Auth";
import Spinner from "../../Ui/Spinner";
import { imageOptimizer } from "../../Util/imageOptimizer";
import FocusTrapRedirectFocus from "../FocusTrap";
import "./ChangeProfilePicModal.scss";

interface Props {
  handleToggleModal: () => void;
}

const ChangeProfilePicModal = (props: Props) => {
  const { authState, dispatch } = useRedux();

  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [
    changeProfilePictureRequest,
    { isLoading: isChangeRequestLoading, error: changeRequestError },
  ] = useFetchWithRetry({
    query: CHANGE_PROFILE_PICTURE_MUTATION,
    variables: { image },
    accessToken: authState.accessToken,
  });

  const [
    removeProfilePictureRequest,
    { isLoading: isRemoveRequestLoading, error: removeRequestError },
  ] = useFetchWithRetry({
    query: REMOVE_PROFILE_PICTURE_MUTATION,
    variables: {},
    accessToken: authState.accessToken,
  });

  const firstFocusableElement = useRef<any>();
  const lastFocusableElement = useRef<any>();

  const handleChooseFile = () => {
    const fileInput = document.querySelector(
      ".changeProfilePicModal__fileInput"
    ) as HTMLInputElement;
    fileInput.click();
  };

  const handleOptimizeImage = (event: any) => {
    const image = event.target.files[0];
    const file = new FileReader();
    file.readAsDataURL(image);
    file.onload = async () => {
      const optimizedImage = await imageOptimizer(file.result);
      setImage(optimizedImage);
    };
  };

  const handleChangeProfilePicture = useCallback(async () => {
    try {
      const response = await changeProfilePictureRequest();
      if (response.success) {
        dispatch(
          changeProfilePicture({
            profilePicture: {
              fullPicture: response.newFullPictureUrl,
              smallPicture: response.newSmallPictureUrl,
            },
          })
        );
        props.handleToggleModal();
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }, [changeProfilePictureRequest, dispatch, props]);

  const handleRemoveProfilePicture = async () => {
    try {
      const response = await removeProfilePictureRequest();
      if (response.success) {
        dispatch(
          changeProfilePicture({
            profilePicture: {
              fullPicture: response.newPictureUrl,
              smallPicture: response.newPictureUrl,
            },
          })
        );
        props.handleToggleModal();
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    console.log("here");
    if (image) {
      handleChangeProfilePicture();
    }
  }, [image]);

  useEffect(() => {
    if (isChangeRequestLoading || isRemoveRequestLoading) {
      setIsLoading(true);
      return;
    }
    setIsLoading(false);
  }, [isChangeRequestLoading, isRemoveRequestLoading]);

  useEffect(() => {
    if (changeRequestError || removeRequestError) {
      setError(changeRequestError ? changeRequestError : removeRequestError);
      return;
    }
    setError("");
  }, [changeRequestError, removeRequestError]);

  return (
    <div className="changeProfilePicModal">
      <FocusTrapRedirectFocus element={lastFocusableElement} />
      <div
        className="changeProfilePicModal__backdrop"
        onClick={props.handleToggleModal}
      ></div>
      <div className="changeProfilePicModal__container">
        {isLoading && <Spinner size="big" />}
        {!isLoading && (
          <>
            {!isLoading && error && (
              <p className="changeProfilePicModal__errorMessage">error</p>
            )}
            <img
              src={authState.user?.profilePicture.fullPicture}
              width="100"
              height="100"
              alt=""
              className="changeProfilePicModal__profilePic"
            />
            <input
              type="file"
              className="changeProfilePicModal__fileInput"
              onChange={handleOptimizeImage}
              accept="image/jpeg, image/png"
            />
            <button
              className="changeProfilePicModal__btn btn-upload"
              ref={firstFocusableElement}
              autoFocus={true}
              onClick={handleChooseFile}
            >
              Upload photo
            </button>
            <button
              className="changeProfilePicModal__btn btn-remove"
              onClick={handleRemoveProfilePicture}
            >
              Remove photo
            </button>
            <button
              className="changeProfilePicModal__btn"
              onClick={props.handleToggleModal}
              ref={lastFocusableElement}
            >
              Cancel
            </button>
          </>
        )}
      </div>
      <FocusTrapRedirectFocus element={firstFocusableElement} />
    </div>
  );
};

export default ChangeProfilePicModal;
