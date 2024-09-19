import { Chart as ChartJS, LineElement, BarElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { useRef } from 'react';
import './BodyDetailGraph.scss';

// Chart.js에서 사용할 요소와 플러그인 등록
ChartJS.register(LineElement, BarElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface BodyDetailGraphProps {
  filteredData: { date: string; weight: number; fat: number; muscle: number }[];
}

export default function BodyDetailGraph({ filteredData }: BodyDetailGraphProps) {
  const chartRef = useRef<ChartJS<'line' | 'bar'> | null>(null);

  // 가장 최근 데이터의 몸무게를 기준으로 y축 범위 설정
  const lastWeight = filteredData[filteredData.length - 1]?.weight || 0;

  // 그래프 데이터 설정
  const data = {
    labels: filteredData.map((item) => `${new Date(item.date).getDate()}일`),
    datasets: [
      {
        type: 'bar' as const,
        label: '몸무게',
        data: filteredData.map((item) => item.weight),
        backgroundColor: '#4bc0c0',
        borderColor: '#4bc0c0',
        borderWidth: 1,
        yAxisID: 'weight',
      },
      {
        type: 'line' as const,
        label: '체지방량',
        data: filteredData.map((item) => item.fat),
        borderColor: '#ff6384',
        fill: false,
        tension: 0.1,
        yAxisID: 'fatMuscle',
        pointRadius: 0,
      },
      {
        type: 'line' as const,
        label: '골격근량',
        data: filteredData.map((item) => item.muscle),
        borderColor: '#36a2eb',
        fill: false,
        tension: 0.1,
        yAxisID: 'fatMuscle',
        pointRadius: 0,
      },
    ],
  };

  // 그래프 옵션 설정
  const options = {
    scales: {
      x: {
        title: {
          display: true,
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 31,
        },
      },
      weight: {
        type: 'linear' as const,
        position: 'left' as const,
        min: lastWeight - 10,
        max: lastWeight + 10,
        ticks: {
          stepSize: 2, // y축을 2 단위로 나눔
        },
        title: {
          display: true,
        },
        grid: {
          drawOnChartArea: false,
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
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            if (context.dataset.label === '체지방량' || context.dataset.label === '골격근량') {
              return context.raw !== null ? `${context.dataset.label}: ${context.raw}` : '';
            }
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="chartContainer">
      <Chart ref={chartRef} type="bar" data={data} options={options} className="chartMain"/>
      <ul className="chartjs-legend"></ul>
    </div>
  );
}
