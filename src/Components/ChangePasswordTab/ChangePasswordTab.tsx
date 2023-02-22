import { FormEvent, useEffect, useState } from 'react';
import { CHANGE_PASSWORD_MUTATION } from '../../GraphQL/Mutations/authMutations';
import useFetchWithRetry from '../../Hooks/useFetchWithRetry';
import useRedux from '../../Hooks/useRedux';
import { PASSWORD_REGEX } from '../../Util/registerValidationRegex';
import InputGroup from '../InputGroup/InputGroup';
import { ConfirmPasswordNotes, PasswordNotes } from '../InputGroup/Notes/Notes';
import './ChangePasswordTab.scss';
const ChangePasswordTab = () => {
  const { authState } = useRedux();

  const [successMessage, setSuccessMesage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [oldPassword, setOldPassword] = useState('');

  const [newPassword, setNewPassword] = useState('');
  const [isValidNewPassword, setIsValidNewPassword] = useState(false);
  const [isNewPasswordFocused, setIsNewPasswordFocused] = useState(false);

  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isValidConfirmNewPassword, setIsValidConfirmNewPassword] = useState(false);
  const [isConfirmNewPasswordFocused, setIsConfirmNewPasswordFocused] = useState(false);

  useEffect(() => {
    setIsValidNewPassword(PASSWORD_REGEX.test(newPassword));
  }, [newPassword]);

  useEffect(() => {
    setIsValidConfirmNewPassword(newPassword === confirmNewPassword);
  }, [newPassword, confirmNewPassword]);

  const [changePasswordRequest, { isLoading, error }] = useFetchWithRetry({
    query: CHANGE_PASSWORD_MUTATION,
    variables: { oldPassword, newPassword },
    accessToken: authState.accessToken,
  });

  const handleChangePassword = async (event: FormEvent) => {
    event.preventDefault();
    setSuccessMesage('');
    setErrorMessage('');
    try {
      const response = await changePasswordRequest();
      if (response.success) {
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setSuccessMesage(response.message);
      } else {
        setErrorMessage(response.message);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <section className="changePasswordTab">
      <div className="changePasswordTab__container">
        <div className="changePasswordTab__changePicture">
          <img
            src={authState.user?.profilePicture.smallPicture}
            width="45"
            height="45"
            alt=""
          />
          <div className="changePasswordTab__userAndChange">
            <h1>{authState.user?.username}</h1>
          </div>
        </div>
        <form className="changePasswordTab__form" onSubmit={handleChangePassword}>
          {!isLoading && errorMessage && (
            <p className="changePasswordTab__resultMessage error">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="changePasswordTab__resultMessage">{successMessage}</p>
          )}
          <InputGroup
            autoFocus={false}
            autoComplete={'off'}
            inputType={'password'}
            label={'Old Password'}
            isValid={oldPassword.length !== 0}
            setIsFocused={() => {}}
            setValue={setOldPassword}
            value={oldPassword}
            minLength={8}
          ></InputGroup>
          <InputGroup
            autoFocus={false}
            autoComplete={'off'}
            inputType={'password'}
            label={'New Password'}
            isValid={isValidNewPassword}
            setIsFocused={setIsNewPasswordFocused}
            setValue={setNewPassword}
            value={newPassword}
            minLength={8}
          >
            <PasswordNotes
              isFocused={isNewPasswordFocused}
              value={newPassword}
              isValid={isValidNewPassword}
            />
          </InputGroup>
          <InputGroup
            autoFocus={false}
            autoComplete={'off'}
            inputType={'password'}
            label={'Confirm New Password'}
            isValid={isValidConfirmNewPassword}
            setIsFocused={setIsConfirmNewPasswordFocused}
            setValue={setConfirmNewPassword}
            value={confirmNewPassword}
            minLength={8}
          >
            <ConfirmPasswordNotes
              isFocused={isConfirmNewPasswordFocused}
              value={confirmNewPassword}
              isValid={isValidConfirmNewPassword}
            />
          </InputGroup>
          <button
            type="submit"
            disabled={!isValidNewPassword || !isValidConfirmNewPassword || isLoading}
          >
            {isLoading ? 'Loading...' : 'Change Password'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ChangePasswordTab;
