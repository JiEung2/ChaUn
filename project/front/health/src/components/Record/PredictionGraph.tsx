import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList, ResponsiveContainer } from 'recharts';
import CustomTick from './CustomTick'; 
import './PredictionGraph.scss';

interface PredictionGraphProps {
  data: { name: string; weight: number }[];
}

export default function PredictionGraph({ data }: PredictionGraphProps) {
  return (
    <div className="predictionGraphContainer">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={<CustomTick />} />
          <YAxis domain={[0, 90]} ticks={[0, 25, 50, 75, 90]} tick={<CustomTick />} />
          <Tooltip />
          <Bar dataKey="weight" fill="#A8D5BA">
            <LabelList
              dataKey="weight"
              position="top"
              formatter={(value: number) => `${value}kg`}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
