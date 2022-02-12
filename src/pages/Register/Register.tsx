import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import {
  EMAIL_REGEX,
  FULLNAME_REGEX,
  PASSWORD_REGEX,
  USERNAME_REGEX,
} from '../../Util/validationRegex';
import './Register.scss';
import InputGroup from '../../Components/InputGroup/InputGroup';
import { Link, useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

const REGISTER_USER = gql`
  mutation RegisterUser(
    $email: String!
    $fullname: String!
    $username: String!
    $password: String!
    $confirmPassword: String!
  ) {
    registerUser(
      email: $email
      fullname: $fullname
      username: $username
      password: $password
      confirmPassword: $confirmPassword
    ) {
      success
      errors {
        message
      }
      user {
        id
        fullname
        username
        email
      }
    }
  }
`;

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  const [fullname, setFullname] = useState('');
  const [isValidFullname, setIsValidFullname] = useState(false);
  const [isFullnameFocused, setIsFullnameFocused] = useState(false);

  const [username, setUsername] = useState('');
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);

  const [password, setPassword] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmedPasswordFocused] = useState(false);

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

  const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER, {
    variables: { email, fullname, username, password, confirmPassword },
  });

  useEffect(() => {
    setIsSubmitDisabled(
      isValidEmail &&
        isValidFullname &&
        isValidUsername &&
        isValidPassword &&
        isValidConfirmPassword &&
        !loading
        ? false
        : true
    );
  }, [
    isValidEmail,
    isValidFullname,
    isValidUsername,
    isValidPassword,
    isValidConfirmPassword,
    loading,
  ]);

  const resetForm = () => {
    setEmail('');
    setFullname('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  useEffect(() => {
    if (data?.registerUser?.user) {
      resetForm();
      navigate('/login');
    }
  }, [data, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      isValidEmail &&
      isValidFullname &&
      isValidUsername &&
      isValidPassword &&
      isValidConfirmPassword
    ) {
      try {
        registerUser();
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };

  return (
    <main className="registerMain">
      <section className="register">
        <h1 className="register__logo">Bubble</h1>
        <h2 className="register__message">Sign up to see photos from your friends.</h2>
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
          >
            <div
              id="emailnotes"
              className={
                isEmailFocused && email && !isValidEmail
                  ? 'register__notes'
                  : 'register__notes hide-notes'
              }
            >
              <p>
                <FontAwesomeIcon icon={faInfoCircle} className="register__infoIcon" />
                Must be a valid email address.
              </p>
            </div>
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
          >
            <div
              id="fullnamenotes"
              className={
                isFullnameFocused && fullname && !isValidFullname
                  ? 'register__notes'
                  : 'register__notes hide-notes'
              }
            >
              <p>
                <FontAwesomeIcon icon={faInfoCircle} className="register__infoIcon" />
                Between 1 and 35 characters long.
              </p>
              <p>
                <FontAwesomeIcon icon={faInfoCircle} className="register__infoIcon" />
                Must start with a letter.
              </p>
            </div>
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
          >
            <div
              id="usernamenotes"
              className={
                isUsernameFocused && username && !isValidUsername
                  ? 'register__notes'
                  : 'register__notes hide-notes'
              }
            >
              <p>
                <FontAwesomeIcon icon={faInfoCircle} className="register__infoIcon" />4 to
                24 characters.
              </p>
              <p>
                <FontAwesomeIcon icon={faInfoCircle} className="register__infoIcon" />
                Must begin with a letter.
              </p>
              <p>
                <FontAwesomeIcon icon={faInfoCircle} className="register__infoIcon" />
                Letters, numbers, underscores, hyphens allowed.
              </p>
            </div>
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
          >
            <div
              id="passwordnotes"
              className={
                isPasswordFocused && !isValidPassword
                  ? 'register__notes'
                  : 'register__notes hide-notes'
              }
            >
              <p>
                <FontAwesomeIcon icon={faInfoCircle} className="register__infoIcon" />8 to
                24 characters.
              </p>
              <p>
                <FontAwesomeIcon icon={faInfoCircle} className="register__infoIcon" />
                Must include uppercase and lowercase letters, a number and a special
                character.
              </p>
              <p>
                <FontAwesomeIcon icon={faInfoCircle} className="register__infoIcon" />
                <span>Allowed special characters: </span>
                <span aria-label="exclamation mark">!</span>
                <span aria-label="question mark">?</span>
                <span aria-label="at symbol">@</span>
                <span aria-label="hashtag">#</span>
                <span aria-label="dollar sign">$</span>
                <span aria-label="percent">%</span>
              </p>
            </div>
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
          >
            <p
              id="confirmpasswordnotes"
              className={
                isConfirmPasswordFocused && confirmPassword && !isValidConfirmPassword
                  ? 'register__notes'
                  : 'register__notes hide-notes'
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} className="register__infoIcon" />
              <span>Passwords must match.</span>
            </p>
          </InputGroup>

          <button className="register__submit" disabled={isSubmitDisabled}>
            Sign Up
          </button>
        </form>
      </section>
      <div className="register__login">
        <p>
          Have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </main>
  );
};
export default Register;
