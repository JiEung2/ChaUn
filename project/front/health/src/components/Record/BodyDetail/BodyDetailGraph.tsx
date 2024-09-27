import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { useRef, useState } from 'react';
import { format } from 'date-fns';
import './BodyDetailGraph.scss';
import BodyDetailModal from './BodyDetailModal';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface BodyDetailGraphProps {
  filteredData: { date: string; weight: number; fat: number; muscle: number }[];
}

export default function BodyDetailGraph({ filteredData }: BodyDetailGraphProps) {
  const chartRef = useRef<ChartJS<'line', (number | null)[], unknown> | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleChartClick = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const getFormattedDate = (dateString: string) => {
    const [year, month, day] = dateString.split('.').map(Number);
    return { year: 2000 + year, month: month - 1, day }; // year는 24 → 2024로 변환, month는 0-indexed
  };

  // 마지막 날짜를 비교하는 코드
  const lastDate = filteredData[filteredData.length - 1]?.date || format(today, 'yy.MM.dd');
  const { year: lastYear, month: lastMonth } = getFormattedDate(lastDate);

  // 현재 월인지 확인
  const isCurrentMonth = lastYear === currentYear && lastMonth === currentMonth;

  // 모든 날짜에 맞춰 labels 생성
  const generateLabels = () => {
    const labels = ['1일'];
    filteredData.forEach((item) => {
      const day = item.date.split('.')[2];
      if (!labels.includes(`${day}일`)) {
        labels.push(`${day}일`);
      }
    });
    if (isCurrentMonth) {
      labels.push(`${today.getDate()}일`);
    } else {
      labels.push(`${lastDateOfMonth}일`);
    }
    return labels;
  };

  const labels = generateLabels();

  // 날짜를 기반으로 데이터를 채우는 함수 (날짜가 없는 곳은 null로 처리)
  const fillDataForLabels = (key: keyof (typeof filteredData)[0]) => {
    const filledData = labels.map((label) => {
      const day = parseInt(label.replace('일', ''), 10);
      const dataForDay = filteredData.find((item) => Number(item.date.split('.')[2]) === day);
      return dataForDay ? dataForDay[key] : null;
    });
    return filledData;
  };

  // 그래프 데이터 설정
  const data = {
    labels,
    datasets: [
      {
        type: 'line' as const,
        label: '몸무게',
        data: fillDataForLabels('weight') as (number | null)[],
        borderColor: '#4bc0c0',
        backgroundColor: '#4bc0c0',
        fill: false,
        tension: 0.1,
        pointRadius: filteredData.length === 1 ? 3 : 0,
        yAxisID: 'y',
      },
      {
        type: 'line' as const,
        label: '골격근량',
        data: fillDataForLabels('muscle') as (number | null)[],
        borderColor: '#36a2eb',
        backgroundColor: '#36a2eb',
        fill: false,
        tension: 0.1,
        pointRadius: filteredData.length === 1 ? 3 : 0,
        yAxisID: 'y',
      },
      {
        type: 'line' as const,
        label: '체지방량',
        data: fillDataForLabels('fat') as (number | null)[],
        borderColor: '#ff6384',
        backgroundColor: '#ff6384',
        fill: false,
        tension: 0.1,
        pointRadius: filteredData.length === 1 ? 3 : 0,
        yAxisID: 'y',
      },
    ],
  };

  // 그래프 옵션 설정
  const options = {
    maintainAspectRatio: false,
    onClick: handleChartClick,
    scales: {
      x: {
        title: {
          display: true,
        },
        ticks: {
          autoSkip: true,
          callback: function (_: any, index: number): string {
            return labels[index];
          },
          maxRotation: 0,
          minRotation: 0,
        },
      },
      y: {
        type: 'linear' as const,
        beginAtZero: false,
        min: 0,
        max: Math.max(...filteredData.map((item) => item.weight)) + 5,
        title: {
          display: false,
        },
        ticks: {
          stepSize: 5,
        },
        grid: {
          display: true,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        fullWidth: false,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            size: 10,
          },
          boxWidth: 8,
          boxHeight: 8,
          padding: 10,
          generateLabels: (chart: any) => {
            return chart.data.datasets.map((dataset: any, i: number) => ({
              text: dataset.label,
              fillStyle: dataset.borderColor,
              strokeStyle: dataset.borderColor,
              lineWidth: 2,
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
      <Chart
        ref={chartRef}
        type="line"
        data={data}
        options={options}
        className={`chartMain ${filteredData.length === 0 ? 'blurred' : ''}`}
      />
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
