import './StyledButton.scss';

interface StyledButtonProps {
  title: string;
  description?: string;
  icon: string;
  onClick: () => void;
  backgroundColor: string; // 클래스명을 받도록 설정
}

export default function StyledButton({
  title,
  description,
  icon,
  onClick,
  backgroundColor,
}: StyledButtonProps) {
  return (
    <button
      className={`styledButton ${backgroundColor}`}
      onClick={onClick}
    >
      <div className="styledButtonText">
        <p className="styledButtonTitle">{title}</p>
        
        <div className="styledButtonIcon">
          <img src={icon} alt="icon" />
        </div>
        
        {description && <p className="styledButtonDescription">{description}</p>}
      </div>
    </button>
  );
};
