import { useState } from 'react';
import GeneralButton from "@/components/Button/GeneralButton";
import './BodyDetail.scss';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

// 예시 데이터
const sampleData = [
  { date: '2024-09-01', weight: 62.5, fat: 20.1, muscle: 30.2 },
  { date: '2024-09-10', weight: 61.8, fat: 19.8, muscle: 30.4 },
  { date: '2024-09-20', weight: 61.5, fat: 19.5, muscle: 30.6 },
  { date: '2024-08-15', weight: 63.0, fat: 20.5, muscle: 30.1 }, // 8월 데이터 예시
  // ... 다른 데이터 추가 가능
];

export default function BodyDetailPage() {
  const [pivotDate, setPivotDate] = useState<Date>(new Date());
  const [year, setYear] = useState<number>(pivotDate.getFullYear());
  const [month, setMonth] = useState<number>(pivotDate.getMonth() + 1);

  // 현재 선택된 달의 데이터 필터링
  const filteredData = sampleData.filter((item) => {
    const itemDate = new Date(item.date);
    return (
      itemDate.getFullYear() === year &&
      itemDate.getMonth() + 1 === month
    );
  });

  const onDecreaseMonth = () => {
    const newDate = new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1);
    setPivotDate(newDate);
    setYear(newDate.getFullYear());
    setMonth(newDate.getMonth() + 1);
  };

  const onIncreaseMonth = () => {
    const newDate = new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1);
    setPivotDate(newDate);
    setYear(newDate.getFullYear());
    setMonth(newDate.getMonth() + 1);
  };

  // 그래프 데이터와 옵션 설정
  const graphData = {
    labels: ['1일', '10일', '20일', '31일'], // x축 라벨 설정
    datasets: [
      {
        label: '몸무게',
        data: filteredData.map((item) => item.weight),
        borderColor: '#4bc0c0',
        fill: false,
      },
      {
        label: '체지방량',
        data: filteredData.map((item) => item.fat),
        borderColor: '#ff6384',
        fill: false,
      },
      {
        label: '골격근량',
        data: filteredData.map((item) => item.muscle),
        borderColor: '#36a2eb',
        fill: false,
      },
    ],
  };

  const graphOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: '일',
        },
        ticks: {
          autoSkip: false, // 자동으로 스킵하지 않고 모든 라벨 표시
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  // 날짜 형식 변환 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date
      .toLocaleDateString('ko-KR', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\./g, '')
      .replace(/\s/g, '.');
    return formattedDate;
  };

  return (
    <div className="bodyRecordContainer">
      <GeneralButton
        buttonStyle={{ style: 'semiOutlined', size: 'mini' }}
        className="bodyAdd"
      >
        체형 입력
      </GeneralButton>

      <div className="monthNavigation">
        <button onClick={onDecreaseMonth}>&lt;</button>
        <span>
          {year}. {month.toString().padStart(2, '0')}
        </span>
        <button onClick={onIncreaseMonth}>&gt;</button>
      </div>

      {/* 데이터가 없는 경우 문구 표시 */}
      {filteredData.length === 0 ? (
        <p className="noDataMessage">
          해당 월에 입력된 체형 정보가 없습니다. 체형 입력 버튼을 눌러 추가해주세요.
        </p>
      ) : (
        <>
          {/* 그래프 추가 */}
          <div className="graphContainer">
            <Line data={graphData} options={graphOptions} />
          </div>

          {/* 타임라인 추가 */}
          <div className="timeline">
            {filteredData.map((item) => (
              <div className="timelineItem" key={item.date}>
                <div className="timelineDate">{formatDate(item.date)}</div>
                <div className="timelineContent">
                  <p>몸무게: {item.weight}kg</p>
                  <p>골격근량: {item.muscle}kg</p>
                  <p>체지방량: {item.fat}kg</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
