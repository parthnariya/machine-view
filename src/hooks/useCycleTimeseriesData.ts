import { useState, useCallback } from 'react';

import type { ScatteredPoint } from '@/types';

import axios from '@/service/axiosService';

type SignalMap = Record<string, number>;

type CycleTimeseriesResult = {
  actual: SignalMap;
  ideal: number[];
  loading: boolean;
  error: string | null;
  fetchCycleData: (
    point: ScatteredPoint,
    tool_sequence?: string,
  ) => Promise<void>;
  resetState: () => void;
};

export function useCycleTimeseriesData(): CycleTimeseriesResult {
  const [actual, setActual] = useState<SignalMap>({});
  const [ideal, setIdeal] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (point: ScatteredPoint, tool_sequence?: string) => {
      const color =
        point.anomaly === true
          ? 'red'
          : point.anomaly === false
            ? 'green'
            : 'black';
      if (!color || !tool_sequence) {
        setActual({});
        setIdeal([]);
        setLoading(false);
        setError("Both 'color' and 'tool_sequence' are required.");
        return;
      }

      setLoading(true);
      setError(null);

      const query = new URLSearchParams({
        color: color,
        tool_sequence: tool_sequence,
      });

      try {
        const response = await axios.get(
          '/reportingapp/traceability/v2/prediction/cycle_timeseries',
          {
            params: query,
          },
        );

        const data = response.data;
        if (data?.Status) {
          setActual(data.actual_signal || {});
          setIdeal(data.ideal_signal || []);
        } else {
          setError(data?.error || 'Unexpected error');
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || 'Failed to load cycle data');
        } else {
          setError('Unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const resetState = () => {
    setActual({});
    setError(null);
    setIdeal([]);
    setLoading(false);
  };

  return {
    actual,
    ideal,
    loading,
    error,
    fetchCycleData: fetchData,
    resetState,
  };
}
