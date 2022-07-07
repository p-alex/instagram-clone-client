import "./InputGroup.scss";

interface IInputGroupProps {
  label: string;
  inputType: string;
  isValid: boolean;
  value: string;
  setValue: any;
  setIsFocused: any;
  autoFocus: boolean;
  autoComplete: string;
  maxLength?: number;
  minLength?: number;
  children?: any;
}

const InputGroup = ({
  label,
  inputType,
  isValid,
  value,
  setValue,
  setIsFocused,
  autoFocus,
  autoComplete,
  maxLength,
  minLength,
  children,
}: IInputGroupProps) => {
  return (
    <div className="inputGroup">
      <label htmlFor={label.toLowerCase().replace(" ", "")}>{label}</label>
      <input
        id={label.toLowerCase().replace(" ", "")}
        className={!isValid && value ? "invalidInput" : ""}
        type={inputType}
        required
        autoFocus={autoFocus}
        spellCheck={true}
        autoComplete={autoComplete}
        aria-invalid={isValid ? "false" : "true"}
        aria-describedby={`${label.toLowerCase()}notes`}
        aria-autocomplete={"list"}
        value={value}
        maxLength={maxLength ? maxLength : 1000}
        minLength={minLength ? minLength : 0}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {value.length > 0 && children}
    </div>
  );
};

export default InputGroup;
