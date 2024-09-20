import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { useRef, useState } from 'react';
import './BodyDetailGraph.scss';
import BodyDetailModal from './BodyDetailModal';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface BodyDetailGraphProps {
  filteredData: { date: string; weight: number; fat: number; muscle: number }[];
}

export default function BodyDetailGraph({ filteredData }: BodyDetailGraphProps) {
  const chartRef = useRef<ChartJS<'line', (number | null)[], unknown> | null>(null); // ref 타입을 맞추기 위해 (number | null)[]로 수정
  const [isModalOpen, setModalOpen] = useState(false);

  const handleChartClick = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // 현재 날짜와 월 마지막 날짜 계산
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // 해당 월의 마지막 날

  // filteredData의 마지막 날짜 가져오기
  const filteredLastDate = new Date(filteredData[filteredData.length - 1]?.date || today);
  const isCurrentMonth = filteredLastDate.getFullYear() === currentYear && filteredLastDate.getMonth() === currentMonth;

  // 모든 날짜에 맞춰 labels 생성
  const generateLabels = () => {
    if (isCurrentMonth) {
      // 현재 월이면 오늘 날짜까지 표시
      return Array.from({ length: today.getDate() }, (_, i) => `${i + 1}일`);
    } else {
      // 그 외의 경우 해당 월의 마지막 날까지 표시
      return Array.from({ length: lastDateOfMonth }, (_, i) => `${i + 1}일`);
    }
  };

  const labels = generateLabels();

  // 날짜를 기반으로 데이터를 채우는 함수 (날짜가 없는 곳은 null로 처리)
  const fillDataForLabels = (key: keyof typeof filteredData[0]) => {
    const filledData = Array.from({ length: labels.length }, (_, i) => {
      const day = i + 1;
      const dataForDay = filteredData.find(item => new Date(item.date).getDate() === day);
      return dataForDay ? dataForDay[key] : null; // 데이터가 있는 날짜만 값 채우기, 없는 날은 null
    });
    return filledData;
  };

  const data = {
    labels,
    datasets: [
      {
        type: 'line' as const,
        label: '몸무게',
        data: fillDataForLabels('weight') as (number | null)[], // 데이터 타입을 맞춰줌
        borderColor: '#4bc0c0',
        fill: false,
        tension: 0.1,
        pointRadius: 0,
        yAxisID: 'weight',
      },
      {
        type: 'line' as const,
        label: '골격근량',
        data: fillDataForLabels('muscle') as (number | null)[], // 데이터 타입을 맞춰줌
        borderColor: '#36a2eb',
        fill: false,
        tension: 0.1,
        pointRadius: 0,
        yAxisID: 'fatMuscle',
      },
      {
        type: 'line' as const,
        label: '체지방량',
        data: fillDataForLabels('fat') as (number | null)[], // 데이터 타입을 맞춰줌
        borderColor: '#ff6384',
        fill: false,
        tension: 0.1,
        pointRadius: 0,
        yAxisID: 'fatMuscle',
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    onClick: handleChartClick,
    scales: {
      x: {
        title: {
          display: true,
        },
        ticks: {
          autoSkip: true, // 레이블을 자동으로 스킵
          maxTicksLimit: 10, // 최대 표시할 레이블 수 (1일, 11일, 21일, 마지막 날)
          callback: function (_: any, index: number): string {
            return labels[index]; // 생성된 labels 배열을 사용하여 x축에 표시
          },
          maxRotation: 0, // 대각선 레이블 방지
          minRotation: 0,
        },
      },
      weight: {
        type: 'linear' as const,
        position: 'left' as const,
        ticks: {
          display: false,
        },
        title: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
      fatMuscle: {
        type: 'linear' as const,
        position: 'right' as const,
        display: false,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        fullWidth: false, // 범례가 한 줄로 정렬되도록 설정
        labels: {
          usePointStyle: true, // 범례 도형을 원으로 설정
          pointStyle: 'circle',
          font: {
            size: 10, // 글씨 크기를 작게 조정
          },
          boxWidth: 8,
          boxHeight: 8,
          padding: 10,
          generateLabels: (chart: any) => {
            return chart.data.datasets.map((dataset: any, i: number) => ({
              text: dataset.label,
              fillStyle: dataset.borderColor, // 선의 색상과 동일하게 채우기
              strokeStyle: dataset.borderColor, // 테두리 색상도 동일하게 설정
              lineWidth: 2, // 테두리 두께 설정
              pointStyle: 'circle',
              hidden: !chart.isDatasetVisible(i),
              index: i,
            }));
          },
        },
      },
    },
    layout: {
      padding: {
        top: 10, 
        left: 0, 
        right: 20, 
        bottom: 0,
      },
    },
  };

  return (
    <div className="chartContainer">
      <Chart ref={chartRef} type="line" data={data} options={options} className={`chartMain ${filteredData.length === 0 ? 'blurred' : ''}`} />
      {filteredData.length === 0 && (
        <div className="noDataMessage">
          <p>해당 월에 입력된 체형 정보가 없습니다.</p>
          <p>체형 입력 버튼을 눌러 추가해주세요.</p>
        </div>
      )}
      {isModalOpen && <BodyDetailModal onClose={closeModal} filteredData={filteredData} />}
    </div>
  );
}
