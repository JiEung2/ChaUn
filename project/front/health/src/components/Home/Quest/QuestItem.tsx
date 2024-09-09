import './QuestItem.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

interface QuestItemProps {
    title: string;
    completed: boolean;
  }
  
  const QuestItem: React.FC<QuestItemProps> = ({ title, completed }) => {
    return (
      <div className={`questItem ${completed ? 'completed' : ''}`}>
      <span className='checkBox'>
        {completed && <FontAwesomeIcon icon={faCheck} className="checkIcon" />}
      </span>
        <span className="questTitle">{title}</span>
      </div>
    );
  };
  
  export default QuestItem;