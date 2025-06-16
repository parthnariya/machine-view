import { useEffect, useState } from 'react';

import axios from '@/service/axiosService';

type SignalMap = Record<string, number>;

type CycleTimeseriesResult = {
  actual: SignalMap;
  ideal: number[];
  loading: boolean;
  error: string | null;
};

export function useCycleTimeseriesData(
  tool_sequence?: string,
  color?: string | null,
): CycleTimeseriesResult {
  const [actual, setActual] = useState<SignalMap>({});
  const [ideal, setIdeal] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('useEffect');
    if (!color || !tool_sequence) {
      setActual({});
      setIdeal([]);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
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
            params: { query },
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
    };

    fetchData();
  }, [color]);

  return { actual, ideal, loading, error };
}
