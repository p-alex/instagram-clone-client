import { FormEvent, useEffect, useRef, useState } from "react";
import useFetch from "../../Hooks/useFetch";
import Logo from "../../Components/Logo/Logo";
import { RESET_PASSWORD_SEND_EMAIL_MUTATION } from "../../GraphQL/Mutations/authMutations";
import InputGroup from "../../Components/InputGroup/InputGroup";
import { EMAIL_REGEX } from "../../Util/registerValidationRegex";
import "./ResetPasswordSendEmailPage.scss";
import ReCAPTCHA from "react-google-recaptcha";

const ResetPasswordSendEmailPage = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const reRef = useRef<any>();

  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);

  const [recaptchaToken, setRecaptchaToken] = useState("");

  useEffect(() => {
    setIsValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  const [resetPasswordSendEmailRequest, { isLoading, error }] = useFetch({
    query: RESET_PASSWORD_SEND_EMAIL_MUTATION,
    variables: { email, recaptchaToken },
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    const recaptchaToken = await reRef.current!.executeAsync();
    setRecaptchaToken(recaptchaToken);
    reRef.current.reset();
    try {
      const response = await resetPasswordSendEmailRequest();
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
    <>
      {" "}
      <main className="resetPasswordsSendEmailPageMain">
        <section className="resetPasswordsSendEmailPage">
          <Logo />
          {!successMessage && (
            <form
              className="resetPasswordsSendEmailPage__form"
              onSubmit={handleSubmit}
            >
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
                autoComplete={"off"}
                maxLength={150}
              />
              <button
                className="resetPasswordsSendEmailPage__submit"
                disabled={!isValidEmail || isLoading ? true : false}
              >
                {!isLoading ? "Send password reset email" : "Loading..."}
              </button>
            </form>
          )}
          {successMessage && (
            <p className="resetPasswordsSendEmailPage__resultMessage">
              {successMessage}
            </p>
          )}
          {errorMessage && (
            <p className="resetPasswordsSendEmailPage__resultMessage error">
              {errorMessage}
            </p>
          )}
        </section>
      </main>
      <ReCAPTCHA
        sitekey="6Lcjl3cgAAAAAKE-Dj5sZ5dIvVLdEAc7CPScWwgC"
        size="invisible"
        ref={reRef}
      />
    </>
  );
};
export default ResetPasswordSendEmailPage;
