import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';

type CycleLineChartPropsType = {
  actual: Record<string, number>;
  ideal: number[];
};

export default function CycleLineChart({
  actual,
  ideal,
}: CycleLineChartPropsType) {
  const length = Math.max(Object.keys(actual).length, ideal.length);

  const data = Array.from({ length }, (_, i) => ({
    time: i,
    actual: actual?.[i.toString()] ?? null,
    ideal: ideal?.[i] ?? null,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, bottom: 10, left: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          label={{ value: 'Time Index', position: 'bottom' }}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="actual"
          stroke="#1e88e5"
          dot={false}
          name="Actual Signal"
        />
        <Line
          type="monotone"
          dataKey="ideal"
          stroke="#90caf9"
          dot={false}
          name="Ideal Signal"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
