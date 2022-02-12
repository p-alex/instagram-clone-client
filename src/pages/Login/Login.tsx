import { useEffect, useState } from 'react';
import InputGroup from '../../components/InputGroup/InputGroup';
import { Link } from 'react-router-dom';
import './Login.scss';
const Login = () => {
  const [username, setUsername] = useState('');
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);

  const [password, setPassword] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  useEffect(() => {
    setIsValidUsername(username !== '');
  }, [username]);

  useEffect(() => {
    setIsValidPassword(password !== '');
  }, [password]);

  return (
    <main className="loginMain">
      <section className="login">
        <h1 className="login__logo">Bubble</h1>
        <form className="login__form">
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
            disabled={!isValidUsername || !isValidPassword ? true : false}
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
