import './QuestItem.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

interface QuestItemProps {
    title: string;
    completed: boolean;
  }
  
export default function QuestItem({ title, completed }: QuestItemProps) {
    return (
      <div className={`questItem ${completed ? 'completed' : ''}`}>
        <span className='checkBox'>
          {completed && <FontAwesomeIcon icon={faCheck} className="checkIcon" />}
        </span>
        <p className="questTitle">{title}</p>
      </div>
    );
};
