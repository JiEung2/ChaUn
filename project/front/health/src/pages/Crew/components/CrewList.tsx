import React from 'react';
import { useSwipeable } from 'react-swipeable';
// import './CrewList.scss';

type Crew = {
  id: number;
  name: string;
  tag: string;
};

type CrewListProps = {
  crews: Crew[];
};

const CrewList: React.FC<CrewListProps> = ({ crews }) => {
  const handlers = useSwipeable({
    onSwipedLeft: () => scrollRight(),
    onSwipedRight: () => scrollLeft(),
    // preventDefaultTouchmoveEvent: true, // 터치 스크롤 방지
    trackMouse: true, // 마우스 드래그로 스와이프 지원
  });

  const scrollLeft = () => {
    const container = document.getElementById('crew-container');
    if (container) {
      container.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = document.getElementById('crew-container');
    if (container) {
      container.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="crew-list" {...handlers}>
      <div id="crew-container" className="crew-container">
        {crews.map((crew) => (
          <div key={crew.id} className="crew-item">
            <img src="/path/to/profile.png" alt={`${crew.name}`} />
            <p>{crew.name}</p>
            <span>{crew.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrewList;
