import { FormEvent, useEffect, useRef, useState } from 'react';
import useFetch from '../../Hooks/useFetch';
import Logo from '../../Components/Logo/Logo';
import { RESET_PASSWORD_SEND_EMAIL_MUTATION } from '../../GraphQL/Mutations/authMutations';
import InputGroup from '../../Components/InputGroup/InputGroup';
import { EMAIL_REGEX } from '../../Util/registerValidationRegex';
import './ResetPasswordSendEmailPage.scss';
import ReCAPTCHA from 'react-google-recaptcha';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';
import { Link, useNavigate } from 'react-router-dom';

const ResetPasswordSendEmailPage = () => {
  const navigate = useNavigate();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const reRef = useRef<any>();

  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);

  useEffect(() => {
    if (accessToken) return navigate('/');
    setIsValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  const [resetPasswordSendEmailRequest, { isLoading, error }] = useFetch({
    query: RESET_PASSWORD_SEND_EMAIL_MUTATION,
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    try {
      const recaptchaToken = await executeRecaptcha();
      const response = await resetPasswordSendEmailRequest({ email, recaptchaToken });
      if (response.success) {
        setSuccessMessage(response.message);
        return;
      }
      setErrorMessage(response.message);
      reRef.current.reset();
    } catch (error) {
      setErrorMessage('Something went wrong, please try again later.');
      reRef.current.reset();
    }
  };

  const executeRecaptcha = async () => {
    const recaptchaToken = await reRef.current!.executeAsync();
    return recaptchaToken;
  };

  return (
    <>
      <main className="resetPasswordSendEmailPageMain">
        <section className="resetPasswordSendEmailPage">
          <Logo />
          {!successMessage && (
            <form className="resetPasswordSendEmailPage__form" onSubmit={handleSubmit}>
              <InputGroup
                label="Email"
                inputType="email"
                isValid={isValidEmail}
                value={email}
                setValue={setEmail}
                setIsFocused={() => {
                  return false;
                }}
                autoFocus={true}
                autoComplete={'off'}
                maxLength={150}
              />
              <button
                className="resetPasswordSendEmailPage__submit"
                disabled={!isValidEmail || isLoading ? true : false}
              >
                {!isLoading ? 'Send password reset email' : 'Loading...'}
              </button>
            </form>
          )}
          {successMessage && (
            <p className="resetPasswordSendEmailPage__resultMessage">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="resetPasswordSendEmailPage__resultMessage error">
              {errorMessage}
            </p>
          )}
          <Link to={'/login'} className="resetPasswordSendEmailPage__backToLoginLink">
            Back to login
          </Link>
        </section>
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
export default ResetPasswordSendEmailPage;
