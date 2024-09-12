import './PredictionGraph.scss';

interface CustomTickProps {
  x?: number;
  y?: number;
  payload?: { value: string | number };
}

export default function CustomTick({ x = 0, y = 0, payload }: CustomTickProps) {
  return (
    <text x={x} y={y} dy={16} textAnchor="middle" className="graphTick">
      {payload?.value}
    </text>
  );
};
