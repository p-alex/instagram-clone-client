import { FormEvent, useEffect, useState } from "react";
import {
  USERNAME_REGEX,
  FULLNAME_REGEX,
} from "../../Util/registerValidationRegex";
import useRedux from "../../Hooks/useRedux";
import "./EditProfileTab.scss";
import ChangeProfilePicModal from "../ChangeProfilePicModal/ChangeProfilePicModal";
import useFetchWithRetry from "../../Hooks/useFetchWithRetry";
import { EDIT_PROFILE_MUTATION } from "../../GraphQL/Mutations/userMutations";
import { changeUserInfo } from "../../Redux/Auth";
import { replaceBlankLines } from "../../Util/replaceBlankLines";

const EditProfileTab = () => {
  const { authState, dispatch } = useRedux();

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [isChangePictureModalActive, setIsChangePictureModalActive] =
    useState(false);

  const handleToggleChangeProfileModal = () =>
    setIsChangePictureModalActive((prevState) => !prevState);

  const [fullname, setFullname] = useState(authState.user?.fullname);
  const [isValidName, setIsValidName] = useState(false);

  const [username, setUsername] = useState(authState.user?.username);
  const [isValidUsername, setIsValidUsername] = useState(false);

  const [bio, setBio] = useState(authState.user?.bio);
  const [isValidBio, setIsValidBio] = useState(true);

  const [editProfileRequest, { isLoading, error }] = useFetchWithRetry({
    query: EDIT_PROFILE_MUTATION,
    variables: {
      fullname,
      username,
      bio,
    },
    accessToken: authState.accessToken,
  });

  useEffect(() => {
    setIsValidName(FULLNAME_REGEX.test(fullname!));
  }, [fullname, authState.user]);

  useEffect(() => {
    setIsValidUsername(USERNAME_REGEX.test(username ? username : ""));
  }, [username, authState.user]);

  useEffect(() => {
    setIsValidBio(true);
  }, [bio, authState.user]);

  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    if (
      isValidName &&
      isValidUsername &&
      isValidBio &&
      (fullname !== authState.user?.fullname ||
        username !== authState.user?.username ||
        bio !== authState.user?.bio)
    ) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [
    fullname,
    username,
    bio,
    isValidName,
    isValidUsername,
    isValidBio,
    authState.user,
  ]);

  const handleEditProfile = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await editProfileRequest();
      if (response.success) {
        dispatch(
          changeUserInfo({ fullname, username, bio: replaceBlankLines(bio) })
        );
        setErrorMessage("");
        setSuccessMessage(response.message);
      } else {
        setSuccessMessage("");
        setErrorMessage("Something went wrong...");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <section className="editProfileTab">
      {isChangePictureModalActive && (
        <ChangeProfilePicModal
          handleToggleModal={handleToggleChangeProfileModal}
        />
      )}
      <div className="editProfileTab__container">
        <div className="editProfileTab__changePicture">
          <img
            src={authState.user?.profilePicture.smallPicture}
            width="45"
            height="45"
            alt=""
          />
          <div className="editProfileTab__userAndChange">
            <h1>{authState.user?.username}</h1>
            <button
              autoFocus
              onClick={handleToggleChangeProfileModal}
              className="editProfileTab__changePictureBtn"
            >
              Change Profile Photo
            </button>
          </div>
        </div>
        <form className="editProfileTab__form" onSubmit={handleEditProfile}>
          {!isLoading && errorMessage && (
            <p className="editProfileTab__resultMessage error">
              {errorMessage}
            </p>
          )}
          {successMessage && (
            <p className="editProfileTab__resultMessage">{successMessage}</p>
          )}
          <div className="editProfileTab__inputGroup">
            <label htmlFor="name">Full name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              autoComplete={"off"}
              maxLength={35}
              minLength={1}
            />
          </div>
          <div className="editProfileTab__inputGroup">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete={"off"}
              maxLength={14}
              minLength={3}
            />
          </div>
          <div className="editProfileTab__inputGroup">
            <label htmlFor="bio">Bio</label>
            <textarea
              name="bio"
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              autoComplete={"off"}
              maxLength={150}
            />
          </div>
          <button type="submit" disabled={!canSubmit || isLoading}>
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditProfileTab;
