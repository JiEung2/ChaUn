import './Crew.scss';

interface CrewProps {
  imageUrl: string;
  crewName: string;
  tag: string;
  onClick: () => void;
}

export default function Crew({ imageUrl, crewName, tag, onClick }: CrewProps) {
  return (
    <div className="crewProfileCard" onClick={onClick}>
      <img src={imageUrl} alt={crewName} className="crewProfileImage" />
      <p className="crewProfileName">{crewName}</p>
      <div className="crewProfileTag">{`# ${tag}`}</div>
    </div>
  );
}
