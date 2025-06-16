import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useState } from 'react';
import {
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import FilterComponent, {
  type FilterValues,
} from '@/components/FilterComponent';
import Condition from '@/components/UI/Condition';
import { useToolCycleData } from '@/hooks/useToolCycleData';

const ScatterDataPage = () => {
  const [filters, setFilters] = useState<FilterValues | null>(null);
  const { points, threshold, loading, error } = useToolCycleData(filters);

  const handleFilterSubmit = (newFilters: FilterValues) => {
    setFilters(newFilters);
  };

  const handleReset = () => {
    setFilters(null);
  };

  return (
    <Container maxWidth="xl" sx={{ height: '100%', padding: 0 }}>
      <FilterComponent
        onFilterSubmit={handleFilterSubmit}
        onReset={handleReset}
      />

      <Container sx={{ padding: 2 }}>
        <Condition>
          <Condition.If condition={!filters}>
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" color="text.secondary">
                Please submit the filter form to load data
              </Typography>
            </Box>
          </Condition.If>
          <Condition.ElseIf condition={Boolean(loading)}>
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
              <Typography variant="body1" sx={{ ml: 2 }}>
                Loading data...
              </Typography>
            </Box>
          </Condition.ElseIf>
          <Condition.ElseIf condition={Boolean(error)}>
            <Alert severity="error" sx={{ mb: 2 }}>
              Error: {error}
            </Alert>
          </Condition.ElseIf>
          <Condition.Else>
            <ResponsiveContainer width={'100%'} height={500}>
              <ScatterChart
                margin={{ top: 20, right: 30, bottom: 50, left: 20 }}
              >
                <CartesianGrid />
                <XAxis
                  dataKey="epoch"
                  name="Time"
                  domain={['auto', 'auto']}
                  type="number"
                  tickFormatter={(value) =>
                    new Date(value * 1000).toLocaleDateString()
                  }
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
                            <strong>Values</strong>{' '}
                            {point.distance.toLocaleString()}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter name="Tool Cycle" data={points} shape="circle">
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
          </Condition.Else>
        </Condition>
      </Container>
    </Container>
  );
};

export default ScatterDataPage;
