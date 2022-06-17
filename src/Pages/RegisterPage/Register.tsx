import React, { useState, useEffect, useRef } from "react";
import {
  EMAIL_REGEX,
  FULLNAME_REGEX,
  PASSWORD_REGEX,
  USERNAME_REGEX,
} from "../../Util/registerValidationRegex";
import "./Register.scss";
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
  FullNameNotes,
  PasswordNotes,
  UsernameNotes,
} from "../../Components/InputGroup/Notes/Notes";
import ReCAPTCHA from "react-google-recaptcha";

const Register = () => {
  const authState = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    authState.user?.id && navigate("/");
  }, [authState.user]);

  const [successMessage, setSuccessMessage] = useState("");

  const [recaptchaToken, setRecaptchaToken] = useState("");

  const reRef = useRef<any>();

  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  const [fullname, setFullname] = useState("");
  const [isValidFullname, setIsValidFullname] = useState(false);
  const [isFullnameFocused, setIsFullnameFocused] = useState(false);

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

  const emailRegex = EMAIL_REGEX;
  const fullnameRegex = FULLNAME_REGEX;
  const usernameRegex = USERNAME_REGEX;
  const passwordRegex = PASSWORD_REGEX;

  useEffect(() => {
    setIsValidEmail(emailRegex.test(email));
  }, [email, emailRegex]);

  useEffect(() => {
    setIsValidFullname(fullnameRegex.test(fullname));
  }, [fullname, fullnameRegex]);

  useEffect(() => {
    setIsValidUsername(usernameRegex.test(username));
  }, [username, usernameRegex]);

  useEffect(() => {
    setIsValidPassword(passwordRegex.test(password));
  }, [password, passwordRegex]);

  useEffect(() => {
    setIsValidConfirmPassword(confirmPassword === password);
  }, [confirmPassword, password]);

  const [registerUser, { isLoading, error }] = useFetch({
    query: REGISTER_USER_MUTATION,
    variables: {
      email,
      fullname,
      username,
      password,
      confirmPassword,
      recaptchaToken,
    },
  });

  useEffect(() => {
    setIsSubmitDisabled(
      isValidEmail &&
        isValidFullname &&
        isValidUsername &&
        isValidPassword &&
        isValidConfirmPassword &&
        !isLoading
        ? false
        : true
    );
  }, [
    isValidEmail,
    isValidFullname,
    isValidUsername,
    isValidPassword,
    isValidConfirmPassword,
    isLoading,
  ]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      isValidEmail &&
      isValidFullname &&
      isValidUsername &&
      isValidPassword &&
      isValidConfirmPassword
    ) {
      if (reRef.current !== null) {
        const recaptchaToken = await reRef.current!.executeAsync();
        setRecaptchaToken(recaptchaToken);
        reRef.current.reset();
      }

      try {
        const response = await registerUser();
        if (response.success) {
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
      <main className="registerMain">
        <section className="register">
          <Logo />
          {successMessage && (
            <p className="register__successMessage">{successMessage}</p>
          )}
          {!successMessage && (
            <>
              <form className="register__form" onSubmit={handleSubmit}>
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

                {/* ========================== FULLNAME INPUT ========================== */}
                <InputGroup
                  label="Full Name"
                  inputType="text"
                  isValid={isValidFullname}
                  value={fullname}
                  setValue={setFullname}
                  setIsFocused={setIsFullnameFocused}
                  autoFocus={false}
                  autoComplete={"off"}
                  maxLength={35}
                  minLength={1}
                >
                  <FullNameNotes
                    isFocused={isFullnameFocused}
                    value={fullname}
                    isValid={isValidFullname}
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
                  maxLength={20}
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
      <ReCAPTCHA
        sitekey="6Lcjl3cgAAAAAKE-Dj5sZ5dIvVLdEAc7CPScWwgC"
        size="invisible"
        ref={reRef}
      />
    </>
  );
};
export default Register;
