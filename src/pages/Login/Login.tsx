import React, { useContext, useEffect, useState } from 'react';
import InputGroup from '../../Components/InputGroup/InputGroup';
import { Link, useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import './Login.scss';
import { AppContext } from '../../Context/Context';

const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      success
      message
      userId
      accessToken
    }
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AppContext);

  const [username, setUsername] = useState('');
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);

  const [password, setPassword] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER, {
    variables: { username, password },
  });

  useEffect(() => {
    if (data?.loginUser?.success) {
      setUser((prevState: { userId: string; accessToken: string }) => ({
        ...prevState,
        userId: data.loginUser.userId,
        accessToken: data.loginUser.accessToken,
      }));
      navigate('/');
    }
  }, [data, navigate]);

  useEffect(() => {
    setIsValidUsername(username !== '');
  }, [username]);

  useEffect(() => {
    setIsValidPassword(password !== '');
  }, [password]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isValidUsername && isValidPassword) {
      try {
        loginUser();
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };

  return (
    <main className="loginMain">
      <section className="login">
        <h1 className="login__logo">Bubble</h1>
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
            disabled={!isValidUsername || !isValidPassword || loading ? true : false}
          >
            Log In
          </button>
        </form>
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
