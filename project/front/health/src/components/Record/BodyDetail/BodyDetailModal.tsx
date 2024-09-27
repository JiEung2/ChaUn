import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import xCircle from '@/assets/svg/xCircle.svg';
import './BodyDetailModal.scss';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

interface BodyDetailModalProps {
  filteredData: { date: string; weight: number; fat: number; muscle: number }[];
  onClose: () => void;
}

export default function BodyDetailModal({ filteredData, onClose }: BodyDetailModalProps) {
  const createLineData = (label: string, color: string, key: keyof (typeof filteredData)[0]) => ({
    labels: filteredData.map((item) => `${item.date.split('.')[2]}일`),
    datasets: [
      {
        label,
        data: filteredData.map((item) => item[key]),
        borderColor: color,
        backgroundColor: color, // 선 색상과 동일한 원의 색상 설정
        fill: false,
        tension: 0.1,
      },
    ],
  });

  const lineOptions = {
    scales: {
      x: { title: { display: true } },
      y: { title: { display: true } },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        fullWidth: false, // 범례가 한 줄로 정렬되도록 설정
        labels: {
          usePointStyle: true, // 범례 도형을 원으로 설정
          pointStyle: 'circle',
          font: {
            size: 10, // 글씨 크기를 작게 조정
          },
          boxWidth: 8,
          boxHeight: 8,
          padding: 2, // 범례 간 간격을 좁힘
          generateLabels: (chart: any) => {
            return chart.data.datasets.map((dataset: any) => ({
              text: dataset.label,
              fillStyle: dataset.borderColor, // 범례 원 내부 색상을 선 색상과 동일하게 설정
              strokeStyle: dataset.borderColor,
              pointStyle: 'circle',
            }));
          },
        },
      },
    },
    layout: {
      padding: {
        top: 2,
        bottom: 0,
        left: -10, // 그래프와 범례 간의 간격을 줄임
      },
    },
  };

  return (
    <div className="bodyDetailModalContainer">
      <div className="bodyDetailModalContent">
        <img src={xCircle} alt="xCircle" className="xCircle" onClick={onClose} />
        <Chart type="line" data={createLineData('몸무게 (kg)', '#4bc0c0', 'weight')} options={lineOptions} />
        <Chart type="line" data={createLineData('골격근량 (kg)', '#36a2eb', 'muscle')} options={lineOptions} />
        <Chart type="line" data={createLineData('체지방률 (%)', '#ff6384', 'fat')} options={lineOptions} />
      </div>
    </div>
  );
}
