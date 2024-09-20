import './Crew.scss';

interface CrewProps {
  imageUrl: string;
  name: string;
  tag: string;
  onClick: () => void;
}

export default function Crew({ imageUrl, name, tag, onClick }: CrewProps) {
  return (
    <div className="profile-card" onClick={onClick}>
      <img src={imageUrl} alt={name} className="profile-image" />
      <div className="profile-info">
        <p className="profile-name">{name}</p>
        <div className="profile-tag">{`# ${tag}`}</div>
      </div>
    </div>
  );
}
