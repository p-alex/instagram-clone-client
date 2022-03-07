import React, { useContext, useEffect, useState } from 'react';
import InputGroup from '../../Components/InputGroup/InputGroup';
import { Link, useNavigate } from 'react-router-dom';
import './Login.scss';
import { GlobalContext, ILoggedInUser } from '../../Context/GlobalContext';
import useAxios from '../../Hooks/useAxios';
import Logo from '../../Components/Logo/Logo';
import { LOGIN_USER_MUTATION } from '../../GraphQL/Mutations/authMutations';

const Login = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(GlobalContext);

  const [errMessage, setErrMessage] = useState('');

  const [username, setUsername] = useState('');
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);

  const [password, setPassword] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const [loginUser, { isLoading, error }] = useAxios({
    query: LOGIN_USER_MUTATION,
    variables: { username, password },
  });

  useEffect(() => {
    user?.userId && navigate('/');
  }, [user]);

  useEffect(() => {
    setIsValidUsername(username.length >= 6);
  }, [username]);

  useEffect(() => {
    setIsValidPassword(password.length >= 8);
  }, [password]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isValidUsername && isValidPassword) {
      try {
        const response = await loginUser();
        if (response?.success) {
          setUser((prevState: ILoggedInUser | null) => ({
            ...prevState,
            userId: response.userId,
            username: response.username,
            profileImg: response.profileImg,
            accessToken: response.accessToken,
          }));
          navigate('/');
        }
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };

  return (
    <main className="loginMain">
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
          />
          <InputGroup
            label="Password"
            inputType="password"
            isValid={isValidPassword}
            value={password}
            setValue={setPassword}
            setIsFocused={setIsPasswordFocused}
            autoFocus={false}
          />
          <button
            className="login__submit"
            disabled={!isValidUsername || !isValidPassword || isLoading ? true : false}
          >
            Log In
          </button>
        </form>
        {error && <p className="login__errorMessage">{error}</p>}
      </section>
      <div className="login__register">
        <p>
          Need an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;