import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList, ResponsiveContainer } from 'recharts';
import CustomTick from './CustomTick';
import './PredictionGraph.scss';

interface PredictionGraphProps {
  data: { time: string; weight: number }[];
}

export default function PredictionGraph({ data = [] }: PredictionGraphProps) {
  // 기본 매개변수
  return (
    <div className="predictionGraphContainer">
      <ResponsiveContainer width="110%" height={240}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" tick={<CustomTick />} />
          <YAxis domain={[0, 90]} ticks={[0, 25, 50, 75, 90]} tick={<CustomTick />} />
          <Tooltip />
          <Bar dataKey="weight" fill="#A8D5BA" barSize={40}>
            <LabelList dataKey="weight" position="top" formatter={(value: number) => `${value}kg`} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
