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
  const length = Math.min(Object.keys(actual).length, ideal.length);

  const series = [
    // {
    //   name: 'Ideal Signal',
    //   data: Array.from({ length }, (_, i) => ({
    //     time: i,
    //     value: parseFloat(ideal?.[i]?.toFixed(3)) ?? null,
    //   })),
    //   stroke: '#90caf9',
    // },
    {
      name: 'Actual Signal',
      data: Object.values(actual)
        .map((value, index) => ({
          time: index,
          value,
        }))
        .slice(0, length),

      stroke: '#1e88e5',
    },
  ];
  console.log(series);
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        margin={{ top: 20, right: 30, bottom: 10, left: 0 }}
        data={series}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          label={{ value: 'Time Index', position: 'bottom' }}
        />
        <YAxis dataKey="value" />
        <Tooltip />
        <Legend />
        {series.map((s) => (
          <Line data={s.data} name={s.name} key={s.name} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
