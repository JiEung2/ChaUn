import './Crew.scss';

interface CrewProps {
  imageUrl: string;
  name: string;
  tag: string;
  onClick: () => void;
}

export default function Crew({ imageUrl, name, tag, onClick }: CrewProps) {
  return (
    <div className="crewProfileCard" onClick={onClick}>
      <img src={imageUrl} alt={name} className="crewProfileImage" />
      <p className="crewProfileName">{name}</p>
      <div className="crewProfileTag">{`# ${tag}`}</div>
    </div>
  );
}
