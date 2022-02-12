import './InputGroup.scss';

interface IInputGroupProps {
  label: string;
  inputType: string;
  isValid: boolean;
  value: string;
  setValue: any;
  setIsFocused: any;
  autoFocus: boolean;
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
  children,
}: IInputGroupProps) => {
  return (
    <div className="inputGroup">
      {/* ============= EMAIL INPUT ============= */}
      <label htmlFor={label.toLowerCase().replace(' ', '')}>{label}</label>
      <input
        id={label.toLowerCase().replace(' ', '')}
        className={!isValid && value ? 'invalidInput' : ''}
        type={inputType}
        required
        autoFocus={autoFocus}
        autoComplete="off"
        aria-invalid={isValid ? 'false' : 'true'}
        aria-describedby={`${label.toLowerCase()}notes`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {children}
    </div>
  );
};

export default InputGroup;
