import './SelectButton.scss';

interface SelectButtonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export default function SelectButton({
  label,
  selected,
  onClick,
}: SelectButtonProps) {
  return (
    <button
      className={`selectButton ${selected ? 'selected' : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}