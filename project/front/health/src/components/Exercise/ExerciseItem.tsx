import './ExerciseItem.scss';
import GeneralButton from '../Button/GeneralButton';

interface ExerciseItemProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export default function ExerciseItem({ label, selected, onClick }: ExerciseItemProps) {
  // label의 길이에 따라 width를 동적으로 설정
  const getWidth = () => {
    if (label.length === 2) return '64px';
    if (label.length === 3) return '74px';
    if (label.length === 4) return '84px';
    if (label.length === 5) return '94px';
    return '176px'; // 4글자 이상
  };

  return (
    <GeneralButton
      buttonStyle={{ style: 'outlined', size: 'semiTiny' }}
      className={`exerciseItem ${selected ? 'selected' : ''}`}
      onClick={onClick}
      style={{ width: getWidth() }} // 스타일에 동적으로 width 설정
    >
      {label}
    </GeneralButton>
  );
}