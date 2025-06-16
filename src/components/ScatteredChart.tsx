import {
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

import type { ScatteredPoint } from '@/types';

type ScatteredChartPropType = {
  points: ScatteredPoint[];
  threshold?: number;
  handleDotClick: (point: ScatteredPoint) => void;
};

const ScatteredChart = ({
  points,
  threshold,
  handleDotClick,
}: ScatteredChartPropType) => {
  return (
    <ResponsiveContainer width={'100%'} height={500}>
      <ScatterChart margin={{ top: 20, right: 30, bottom: 50, left: 20 }}>
        <CartesianGrid />
        <XAxis
          dataKey="epoch"
          name="Time"
          domain={['auto', 'auto']}
          type="number"
          tickFormatter={(value) => new Date(value * 1000).toLocaleDateString()}
          label={{ value: 'Time', position: 'bottom', offset: 10 }}
        />
        <YAxis
          dataKey="distance"
          name="Distance"
          label={{
            value: 'Distance',
            angle: -90,
            position: 'insideLeft',
          }}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length > 0) {
              const point = payload[0].payload;
              return (
                <div
                  style={{
                    background: 'white',
                    padding: '8px',
                    border: '1px solid #ccc',
                  }}
                >
                  <div>
                    <strong>Epoch:</strong> {point.epoch}
                  </div>
                  <div>
                    <strong>Start Time:</strong>{' '}
                    {new Date(point.start_time).toLocaleString()}
                  </div>
                  <div>
                    <strong>End Time:</strong>{' '}
                    {new Date(point.end_time).toLocaleString()}
                  </div>
                  <div>
                    <strong>Values</strong> {point.distance.toLocaleString()}
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
        <Scatter
          name="Tool Cycle"
          data={points}
          shape="circle"
          onClick={(data, _, event) => {
            event.preventDefault();
            if (handleDotClick) {
              handleDotClick(data);
            }
          }}
        >
          {points.map((point, idx) => (
            <Cell
              key={`cell-${idx}`}
              fill={
                point.anomaly === true
                  ? '#c62828e1'
                  : point.anomaly === false
                    ? '#4caf4fcb'
                    : '#3333339f'
              }
            />
          ))}
        </Scatter>
        {threshold !== undefined && (
          <ReferenceLine
            y={threshold}
            stroke="#EF9A9A"
            strokeDasharray="3 3"
            label={{
              value: `Threshold (${threshold})`,
              position: 'top',
              fill: '#c62828',
            }}
          />
        )}
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default ScatteredChart;
