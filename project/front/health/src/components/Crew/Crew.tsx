import './Crew.scss';

interface CrewProps {
  imageUrl: string;
  name: string;
  tag: string;
}

export default function Crew({ imageUrl, name, tag }: CrewProps) {
  return (
    <div className="profile-card">
      <img src={imageUrl} alt={name} className="profile-image" />
      <div className="profile-info">
        <p className="profile-name">{name}</p>
        <div className="profile-tag">{`# ${tag}`}</div>
      </div>
    </div>
  );
}
