import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import QuestIcon from '../../assets/svg/quest.svg';
import CalendarIcon from '../../assets/svg/calendar.svg';
import StyledButton from '../../components/Button/StyledButton';
import HomeIcon1 from '../../assets/svg/homeIcon1.svg';
import HomeIcon2 from '../../assets/svg/homeIcon2.svg';
import 'chart.js/auto';
import './Home.scss';

interface SlideContent {
    name: string;
    time: string;
    description: string;
  }
  
  const slides: SlideContent[] = [
    {
      name: '민영',
      time: '7h 48m',
      description: '오늘 운동 시간',
    },
    {
      name: '민영',
      time: '30h 20m',
      description: '이번 주 운동 시간',
    },
  ];

export default function HomePage () {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // 그래프 데이터 예시
  const chartData = {
    labels: ['일', '월', '화', '수', '목', '금', '토'],
    datasets: [
      {
        label: '시간',
        data: [3, 4, 5, 6, 7, 8, 7],
        borderColor: '#FF6384',
        fill: false,
        tension: 0.4,
      },
      {
        label: '칼로리',
        data: [200, 250, 300, 350, 400, 450, 500],
        borderColor: '#36A2EB',
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="homeContainer">
        <div className="carouselContainer">

            <button className="arrowButton left" onClick={handlePrev}>
                &lt;
            </button>

            <div className="iconWrapper" onClick={() => navigate('/home/quest')}>
                <img src={QuestIcon} alt="Quest Icon" className="icon" />
            </div>

            <div className="iconWrapper" onClick={() => navigate('/home/calendar')}>
                <img src={CalendarIcon} alt="Calendar Icon" className="icon" />
            </div>

            <h2>{slides[currentSlide].name}</h2>
            <p>{slides[currentSlide].description}</p>
            <span className="time">{slides[currentSlide].time}</span>

            <button className="arrowButton right" onClick={handleNext}>
                &gt;
            </button>            
        </div>



      <div className="chartSection">
        <h2>이번 주 운동 그래프</h2>
        <Line data={chartData} options={chartOptions} />
      </div>

      <div className="buttonSection">
        <StyledButton
          title="운동 추천"
          icon={HomeIcon1}
          onClick={() => navigate('/recommend')}
          backgroundColor="styledButton1" // SASS에서 정의한 클래스 사용
        />
        <StyledButton
          title="내 크루 보러가기"
          icon={HomeIcon2}
          onClick={() => navigate('/crew')}
          backgroundColor="styledButton2"
        />
      </div>
    </div>
  );
};
