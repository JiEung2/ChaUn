import './Input.scss';

interface InputFieldProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size: 'large' | 'medium' | 'small' | 'tiny' | 'semiMedium' | 'semiSmall' | 'semiTiny' ;
}

export default function InputField({
  placeholder,
  value,
  onChange,
  size,
}: InputFieldProps) {
  return (
    <input
      className={`inputField ${size}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}