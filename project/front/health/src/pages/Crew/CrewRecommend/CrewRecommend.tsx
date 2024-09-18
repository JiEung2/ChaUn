import Crew from '../../../components/Crew/Crew';
import { useState } from 'react';
import './CrewRecommend.scss';

export default function CrewRecommend() {
  const [nickname, setNickname] = useState('민영'); // 닉네임을 '민영'으로 설정

  const crews = [
    { imageUrl: '/path/to/image1.png', name: '달리는 번개', tag: '런닝' },
    { imageUrl: '/path/to/image2.png', name: '달리는 번개', tag: '런닝' },
    { imageUrl: '/path/to/image3.png', name: '달리는 번개', tag: '런닝' },
    { imageUrl: '/path/to/image4.png', name: '달리는 번개', tag: '런닝' },
    { imageUrl: '/path/to/image5.png', name: '달리는 번개', tag: '런닝' },
    { imageUrl: '/path/to/image6.png', name: '달리는 번개', tag: '런닝' },
    { imageUrl: '/path/to/image7.png', name: '달리는 번개', tag: '런닝' },
    { imageUrl: '/path/to/image8.png', name: '달리는 번개', tag: '런닝' },
    { imageUrl: '/path/to/image9.png', name: '달리는 번개', tag: '런닝' },
  ];

  return (
    <div className="crew-recommend">
      <h3>
        <span className="nickname">{nickname}</span>님, 이런 <span className="highlight">크루</span>를 추천드려요!
      </h3>

      <div className="crew-grid">
        {crews.map((crew, index) => (
          <Crew key={index} imageUrl={crew.imageUrl} name={crew.name} tag={crew.tag} />
        ))}
      </div>
    </div>
  );
}
