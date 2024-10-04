import './Input.scss';

interface InputFieldProps {
  placeholder: string | number;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size: 'large' | 'medium' | 'small' | 'tiny' | 'semiMedium' | 'semiSmall' | 'semiTiny' ;
  type?: string;
}

export default function InputField({
  placeholder,
  value,
  onChange,
  size,
  type = 'text',
}: InputFieldProps) {
  return (
    <input
      className={`inputField ${size}`}
      placeholder={String(placeholder)}
      value={value}
      onChange={onChange}
      type={type}
      min={type === 'number' ? '0' : undefined}
    />
  );
}