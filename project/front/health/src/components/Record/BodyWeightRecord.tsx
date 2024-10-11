import PredictionGraph from '@/components/Record/PredictionGraph';
import './BodyWeightRecord.scss';

interface BodyWeightRecordProps {
  data: {
    current_image: string;
    p30_image: string;
    p90_image: string;
    predictions: { time: string; weight: number }[]; // 그래프를 위한 예측 데이터
  };
}

export default function BodyWeightRecord({ data }: BodyWeightRecordProps) {
  console.log('bodyWeght data', data);
  return (
    <div className="bodyWeightRecord">
      <div className="predictionCards">
        <div className="predictionCard">
          {/* 현재 체형 이미지 */}
          <img src={data.current_image} alt="현재 체형" className="predictionImage__1" />
          <p className="timePoint">현재</p>
        </div>
        <div className="predictionCard">
          {/* 1달 후 예측 체형 이미지 */}
          <img src={data.p30_image} alt="1달 후 체형" className="predictionImage__2" />
          <p className="timePoint">1달 후</p>
        </div>
        <div className="predictionCard">
          {/* 3달 후 예측 체형 이미지 */}
          <img src={data.p90_image} alt="3달 후 체형" className="predictionImage__3" />
          <p className="timePoint">3달 후</p>
        </div>
      </div>

      <div className="predictionGraph">
        <PredictionGraph data={data.predictions} />
      </div>
    </div>
  );
}
