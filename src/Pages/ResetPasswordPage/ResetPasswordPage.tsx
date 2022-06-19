import { FormEvent, useEffect, useState } from "react";
import useFetch from "../../Hooks/useFetch";
import Logo from "../../Components/Logo/Logo";
import {
  RESET_PASSWORD_MUTATION,
  VERIFY_RESET_PASSWORD_TOKEN,
} from "../../GraphQL/Mutations/authMutations";
import InputGroup from "../../Components/InputGroup/InputGroup";
import { PASSWORD_REGEX } from "../../Util/registerValidationRegex";
import "./ResetPasswordPage.scss";
import {
  ConfirmPasswordNotes,
  PasswordNotes,
} from "../../Components/InputGroup/Notes/Notes";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "../../Ui/Spinner";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const { token } = useParams();

  const [verifyErrorMessage, setVerifyErrorMessage] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [isValidNewPassword, setIsValidNewPassword] = useState(false);
  const [isNewPasswordFocused, setIsNewPasswordFocused] = useState(false);

  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isValidConfirmNewPassword, setIsValidConfirmNewPassword] =
    useState(false);
  const [isConfirmNewPasswordFocused, setIsConfirmNewPasswordFocused] =
    useState(false);

  useEffect(() => {
    setIsValidNewPassword(PASSWORD_REGEX.test(newPassword));
  }, [newPassword]);

  useEffect(() => {
    setIsValidConfirmNewPassword(newPassword === confirmNewPassword);
  }, [newPassword, confirmNewPassword]);

  const [verifyResetPasswordTokenRequest, { isLoading: isLoadingVerify }] =
    useFetch({
      query: VERIFY_RESET_PASSWORD_TOKEN,
      variables: { token },
    });

  const handleVerifyToken = async () => {
    try {
      const response = await verifyResetPasswordTokenRequest();
      if (!response.success) setVerifyErrorMessage(response.message);
    } catch (error) {
      setVerifyErrorMessage("Something went wrong, please try again later.");
    }
  };

  useEffect(() => {
    if (accessToken) return navigate("/");
    handleVerifyToken();
  }, []);

  const [resetPasswordRequest, { isLoading: isLoadingReset }] = useFetch({
    query: RESET_PASSWORD_MUTATION,
    variables: { token, newPassword, confirmNewPassword },
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    try {
      const response = await resetPasswordRequest();
      if (response.success) {
        setSuccessMessage(response.message);
        return;
      }
      setErrorMessage(response.message);
    } catch (error) {
      setErrorMessage("Something went wrong, please try again later.");
    }
  };

  return (
    <main className="resetPasswordPageMain">
      <section className="resetPasswordPage">
        <Logo />
        {isLoadingVerify && <Spinner size="big" />}
        {!successMessage && !verifyErrorMessage && (
          <form className="resetPasswordPage__form" onSubmit={handleSubmit}>
            <InputGroup
              autoFocus={false}
              autoComplete={"off"}
              inputType={"password"}
              label={"New Password"}
              isValid={isValidNewPassword}
              setIsFocused={setIsNewPasswordFocused}
              setValue={setNewPassword}
              value={newPassword}
              maxLength={24}
              minLength={8}
            >
              <PasswordNotes
                isFocused={isNewPasswordFocused}
                value={newPassword}
                isValid={isValidNewPassword}
              />
            </InputGroup>
            <InputGroup
              autoFocus={false}
              autoComplete={"off"}
              inputType={"password"}
              label={"Confirm New Password"}
              isValid={isValidConfirmNewPassword}
              setIsFocused={setIsConfirmNewPasswordFocused}
              setValue={setConfirmNewPassword}
              value={confirmNewPassword}
              maxLength={24}
              minLength={8}
            >
              <ConfirmPasswordNotes
                isFocused={isConfirmNewPasswordFocused}
                value={confirmNewPassword}
                isValid={isValidConfirmNewPassword}
              />
            </InputGroup>
            <button
              className="resetPasswordPage__submit"
              disabled={
                !isValidNewPassword ||
                !isValidConfirmNewPassword ||
                isLoadingReset
              }
            >
              {!isLoadingReset ? "Reset password" : "Loading..."}
            </button>
          </form>
        )}
        {verifyErrorMessage && (
          <p className="resetPasswordPage__resultMessage error">
            {verifyErrorMessage}
          </p>
        )}
        {errorMessage && (
          <p className="resetPasswordPage__resultMessage error">
            {errorMessage}
          </p>
        )}
        {successMessage && (
          <>
            <p className="resetPasswordPage__resultMessage">{successMessage}</p>
            <Link to="/login" className="resetPasswordPage__loginLink">
              Login
            </Link>
          </>
        )}
      </section>
    </main>
  );
};
export default ResetPasswordPage;
