interface NotesProps {
  isFocused: boolean;
  value: string;
  isValid: boolean;
}

export const EmailNotes = (props: NotesProps) => {
  return (
    <div
      id="emailnotes"
      className={
        props.isFocused && props.value && !props.isValid
          ? 'register__notes'
          : 'register__notes hide-notes'
      }
    >
      <p>
        <i className="fa-solid fa-circle-info"></i> Must be a valid email address.
      </p>
    </div>
  );
};

export const FullNameNotes = (props: NotesProps) => {
  return (
    <div
      id="fullnamenotes"
      className={
        props.isFocused && props.value && !props.isValid
          ? 'register__notes'
          : 'register__notes hide-notes'
      }
    >
      <p>
        <i className="fa-solid fa-circle-info"></i> Between 1 and 35 characters long.
      </p>
      <p>
        <i className="fa-solid fa-circle-info"></i> Must start with a letter.
      </p>
    </div>
  );
};

export const UsernameNotes = (props: NotesProps) => {
  return (
    <div
      id="usernamenotes"
      className={
        props.isFocused && props.value && !props.isValid
          ? 'register__notes'
          : 'register__notes hide-notes'
      }
    >
      <p>
        <i className="fa-solid fa-circle-info"></i> 24 characters.
      </p>
      <p>
        <i className="fa-solid fa-circle-info"></i> Must begin with a letter.
      </p>
      <p>
        <i className="fa-solid fa-circle-info"></i> Letters, numbers, underscores, hyphens
        allowed.
      </p>
    </div>
  );
};

export const PasswordNotes = (props: NotesProps) => {
  return (
    <div
      id="passwordnotes"
      className={
        props.isFocused && props.value && !props.isValid
          ? 'register__notes'
          : 'register__notes hide-notes'
      }
    >
      <p>
        <i className="fa-solid fa-circle-info"></i> minimum 8 characters long.
      </p>
      <p>
        <i className="fa-solid fa-circle-info"></i> at least one lowercase letter.
      </p>
      <p>
        <i className="fa-solid fa-circle-info"></i> at least one uppercase letter.
      </p>
      <p>
        <i className="fa-solid fa-circle-info"></i> at least one number.
      </p>
      <p>
        <i className="fa-solid fa-circle-info"></i> at least one symbol.
      </p>
    </div>
  );
};

export const ConfirmPasswordNotes = (props: NotesProps) => {
  return (
    <div
      id="confirmpasswordnotes"
      className={
        props.isFocused && props.value && !props.isValid
          ? 'register__notes'
          : 'register__notes hide-notes'
      }
    >
      <p>
        <i className="fa-solid fa-circle-info"></i> <span>Passwords must match.</span>
      </p>
    </div>
  );
};
