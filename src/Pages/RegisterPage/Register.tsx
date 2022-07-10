import React, { useState, useEffect, useRef } from "react";
import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
  USERNAME_REGEX,
} from "../../Util/registerValidationRegex";
import InputGroup from "../../Components/InputGroup/InputGroup";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import Logo from "../../Components/Logo/Logo";
import { REGISTER_USER_MUTATION } from "../../GraphQL/Mutations/authMutations";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import {
  ConfirmPasswordNotes,
  EmailNotes,
  PasswordNotes,
  UsernameNotes,
} from "../../Components/InputGroup/Notes/Notes";
import ReCAPTCHA from "react-google-recaptcha";
import "./Register.scss";
import { Helmet } from "react-helmet";

const Register = () => {
  const authState = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const [recaptchaToken, setRecaptchaToken] = useState("");

  useEffect(() => {
    authState.user?.id && navigate("/");
  }, [authState.user]);

  const [successMessage, setSuccessMessage] = useState("");

  const reRef = useRef<any>();
  const formRef = useRef<any>();

  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  const [username, setUsername] = useState("");
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);

  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmedPasswordFocused] =
    useState(false);

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    setIsValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setIsValidUsername(USERNAME_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setIsValidPassword(PASSWORD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    setIsValidConfirmPassword(confirmPassword === password);
  }, [confirmPassword, password]);

  const [registerUser, { isLoading, error }] = useFetch({
    query: REGISTER_USER_MUTATION,
    variables: {
      email,
      username: username.toLowerCase(),
      password,
      confirmPassword,
      recaptchaToken,
    },
  });

  const executeRecaptcha = async () => {
    const recaptchaToken = await reRef.current!.executeAsync();
    reRef.current.reset();
    setRecaptchaToken(recaptchaToken);
  };

  useEffect(() => {
    const isAllValid =
      isValidEmail &&
      isValidUsername &&
      isValidPassword &&
      isValidConfirmPassword &&
      !isLoading;
    setIsSubmitDisabled(!isAllValid);
    if (isAllValid) {
      executeRecaptcha();
    }
  }, [
    isValidEmail,
    isValidUsername,
    isValidPassword,
    isValidConfirmPassword,
    isLoading,
  ]);

  const handleResetForm = () => {
    setEmail("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      isValidEmail &&
      isValidUsername &&
      isValidPassword &&
      isValidConfirmPassword
    ) {
      try {
        const response = await registerUser();
        if (response.success) {
          handleResetForm();
          setRecaptchaToken("");
          setSuccessMessage(
            "Account created successfully! Please check your inbox to confirm your email."
          );
        }
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };

  return (
    <>
      <Helmet>
        <meta name="description" content="Create your Bubble account." />
        <title>Bubble</title>
      </Helmet>
      <main className="registerMain">
        <section className="register">
          <Logo />
          {successMessage && (
            <p className="register__successMessage">{successMessage}</p>
          )}
          {!successMessage && (
            <>
              <form
                className="register__form"
                ref={formRef}
                onSubmit={handleSubmit}
              >
                {/* ========================== EMAIL INPUT ========================== */}
                <InputGroup
                  label="Email"
                  inputType="email"
                  isValid={isValidEmail}
                  value={email}
                  setValue={setEmail}
                  setIsFocused={setIsEmailFocused}
                  autoFocus={true}
                  autoComplete={"off"}
                >
                  <EmailNotes
                    isFocused={isEmailFocused}
                    value={email}
                    isValid={isValidEmail}
                  />
                </InputGroup>

                {/* ========================== USERNAME INPUT ========================== */}
                <InputGroup
                  label="Username"
                  inputType="text"
                  isValid={isValidUsername}
                  value={username}
                  setValue={setUsername}
                  setIsFocused={setIsUsernameFocused}
                  autoFocus={false}
                  autoComplete={"off"}
                  maxLength={16}
                  minLength={3}
                >
                  <UsernameNotes
                    isFocused={isUsernameFocused}
                    value={username}
                    isValid={isValidUsername}
                  />
                </InputGroup>

                {/* ========================== PASSWORD INPUT ========================== */}
                <InputGroup
                  label="Password"
                  inputType="password"
                  isValid={isValidPassword}
                  value={password}
                  setValue={setPassword}
                  setIsFocused={setIsPasswordFocused}
                  autoFocus={false}
                  autoComplete={"new-password"}
                  maxLength={24}
                  minLength={8}
                >
                  <PasswordNotes
                    isFocused={isPasswordFocused}
                    value={password}
                    isValid={isValidPassword}
                  />
                </InputGroup>

                {/* ========================== CONFIRM PASSWORD INPUT ========================== */}
                <InputGroup
                  label="Confirm Password"
                  inputType="password"
                  isValid={isValidConfirmPassword}
                  value={confirmPassword}
                  setValue={setConfirmPassword}
                  setIsFocused={setIsConfirmedPasswordFocused}
                  autoFocus={false}
                  autoComplete={"new-password"}
                  maxLength={24}
                  minLength={8}
                >
                  <ConfirmPasswordNotes
                    isFocused={isConfirmPasswordFocused}
                    value={confirmPassword}
                    isValid={isValidConfirmPassword}
                  />
                </InputGroup>

                <button
                  className="register__submit"
                  disabled={isSubmitDisabled}
                >
                  Sign Up
                </button>
              </form>

              {error && <p className="register__errorMessage">{error}</p>}
            </>
          )}
        </section>

        {!successMessage && (
          <div className="register__login">
            <p>
              Have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
        )}
      </main>
      {!successMessage && (
        <ReCAPTCHA
          sitekey="6Lcjl3cgAAAAAKE-Dj5sZ5dIvVLdEAc7CPScWwgC"
          size="invisible"
          ref={reRef}
        />
      )}
    </>
  );
};
export default Register;
