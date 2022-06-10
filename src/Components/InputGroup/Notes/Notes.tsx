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
          ? "register__notes"
          : "register__notes hide-notes"
      }
    >
      <p>
        <i className="fa-solid fa-circle-info"></i> Must be a valid email
        address.
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
          ? "register__notes"
          : "register__notes hide-notes"
      }
    >
      <p>
        <i className="fa-solid fa-circle-info"></i> Between 1 and 35 characters
        long.
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
          ? "register__notes"
          : "register__notes hide-notes"
      }
    >
      <p>
        <i className="fa-solid fa-circle-info"></i> 24 characters.
      </p>
      <p>
        <i className="fa-solid fa-circle-info"></i> Must begin with a letter.
      </p>
      <p>
        <i className="fa-solid fa-circle-info"></i> Letters, numbers,
        underscores, hyphens allowed.
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
          ? "register__notes"
          : "register__notes hide-notes"
      }
    >
      <p>
        <i className="fa-solid fa-circle-info"></i> Minimum 8 characters long.
      </p>
      <p>
        <i className="fa-solid fa-circle-info"></i> Must include uppercase and
        lowercase letters, a number and a special character.
      </p>
      <p>
        <i className="fa-solid fa-circle-info"></i>{" "}
        <span>Allowed special characters: </span>
        <span aria-label="exclamation mark">!</span>
        <span aria-label="question mark">?</span>
        <span aria-label="at symbol">@</span>
        <span aria-label="hashtag">#</span>
        <span aria-label="dollar sign">$</span>
        <span aria-label="percent">%</span>
      </p>
    </div>
  );
};

export const ConfirmPasswordNotes = (props: NotesProps) => {
  return (
    <p
      id="confirmpasswordnotes"
      className={
        props.isFocused && props.value && !props.isValid
          ? "register__notes"
          : "register__notes hide-notes"
      }
    >
      <i className="fa-solid fa-circle-info"></i>{" "}
      <span>Passwords must match.</span>
    </p>
  );
};
