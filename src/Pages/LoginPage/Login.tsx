import React, { useEffect, useRef, useState } from 'react';
import InputGroup from '../../Components/InputGroup/InputGroup';
import { Link, useNavigate } from 'react-router-dom';
import './Login.scss';
import useFetch from '../../Hooks/useFetch';
import Logo from '../../Components/Logo/Logo';
import { LOGIN_USER_MUTATION } from '../../GraphQL/Mutations/authMutations';
import { loginUser } from '../../Redux/Auth';
import useRedux from '../../Hooks/useRedux';
import { Helmet } from 'react-helmet';
import ReCAPTCHA from 'react-google-recaptcha';
import RecaptchaProtection from '../../Components/RecaptchaProtection/RecaptchaProtection';

const Login = () => {
  const navigate = useNavigate();
  const { authState, dispatch } = useRedux();

  const [errMessage, setErrMessage] = useState('');

  const [username, setUsername] = useState('');
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);

  const [password, setPassword] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const reRef = useRef<ReCAPTCHA>(null);

  const [loginUserRequest, { isLoading, error }] = useFetch({
    query: LOGIN_USER_MUTATION,
  });

  useEffect(() => {
    authState.user?.id && navigate('/');
  }, [authState.user]);

  useEffect(() => {
    setIsValidUsername(username.length >= 4);
  }, [username]);

  useEffect(() => {
    setIsValidPassword(password.length >= 8);
  }, [password]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isValidUsername && isValidPassword) {
      try {
        const recaptchaToken = await reRef.current!.executeAsync();
        const response = await loginUserRequest({ username, password, recaptchaToken });
        if (response?.success) {
          dispatch(
            loginUser({
              user: {
                id: response.user.id,
                username: response.user.username,
                email: response.user.email,
                bio: response.user.bio,
                fullname: response.user.fullname,
                profilePicture: {
                  fullPicture: response.user.profilePicture.fullPicture,
                  smallPicture: response.user.profilePicture.smallPicture,
                },
                hasFollowings: response.user.hasFollowings,
              },
              accessToken: response.user.accessToken,
            })
          );
          navigate('/');
          return;
        }
        reRef.current?.reset();
      } catch (error: any) {
        console.log(error.message);
        reRef.current?.reset();
      }
    }
  };

  return (
    <>
      <main className="loginMain">
        <Helmet>
          <meta name="description" content="Create an account or log in to Bubble." />
          <title>Bubble</title>
        </Helmet>
        <section className="login">
          <Logo />
          <form className="login__form" onSubmit={handleSubmit}>
            <InputGroup
              label="Username"
              inputType="text"
              isValid={isValidUsername}
              value={username}
              setValue={setUsername}
              setIsFocused={setIsUsernameFocused}
              autoFocus={true}
              autoComplete={'off'}
              maxLength={20}
              minLength={3}
            />
            <InputGroup
              label="Password"
              inputType="password"
              isValid={isValidPassword}
              value={password}
              setValue={setPassword}
              setIsFocused={setIsPasswordFocused}
              autoFocus={false}
              autoComplete={'off'}
              maxLength={24}
              minLength={8}
            />
            <button
              className="login__submit"
              disabled={!isValidUsername || !isValidPassword || isLoading ? true : false}
            >
              Log In
            </button>
          </form>
          <Link to="/reset-password" className="login__forgotPassword">
            Forgot password?
          </Link>
          {error && <p className="login__errorMessage">{error}</p>}
        </section>
        <div className="login__register">
          <p>
            Need an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </main>
      <RecaptchaProtection reference={reRef} />
    </>
  );
};

export default Login;
