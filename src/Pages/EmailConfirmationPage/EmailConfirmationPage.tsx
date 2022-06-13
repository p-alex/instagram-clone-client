import Logo from "../../Components/Logo/Logo";
import { CONFIRM_EMAIL_MUTATION } from "../../GraphQL/Mutations/authMutations";
import useFetch from "../../Hooks/useFetch";
import useRedux from "../../Hooks/useRedux";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./EmailConfirmationPage.scss";
import { useEffect, useState } from "react";
import Spinner from "../../Ui/Spinner";

const EmailConfirmationPage = () => {
  const { authState } = useRedux();
  const navigate = useNavigate();
  const { confirmationCode } = useParams();

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [confirmEmailRequest, { isLoading, error }] = useFetch({
    query: CONFIRM_EMAIL_MUTATION,
    variables: { confirmationCode },
  });

  const handleConfirmEmail = async () => {
    try {
      const response = await confirmEmailRequest();
      if (response.success) {
        setSuccessMessage("Email confirmed!");
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      setErrorMessage("Something went wrong...");
    }
  };

  useEffect(() => {
    if (authState.accessToken) return navigate("/");
    handleConfirmEmail();
  }, []);

  return (
    <main className="emailConfirmationMain">
      <section className="emailConfirmation">
        <Logo />
        {isLoading && <Spinner size="big" />}
        {successMessage !== null && (
          <p className="emailConfirmation__message">{successMessage}</p>
        )}
        {errorMessage !== null && (
          <p className="emailConfirmation__message">{errorMessage}</p>
        )}
        {successMessage && (
          <Link to="/login" className="emailConfirmation__loginLink">
            Login
          </Link>
        )}
      </section>
    </main>
  );
};
export default EmailConfirmationPage;
