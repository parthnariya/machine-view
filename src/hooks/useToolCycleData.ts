import { useEffect, useState } from 'react';

import type { Filters, ScatteredPoint } from '@/types';

import axios from '@/service/axiosService';

export type ToolCycleData = {
  points: ScatteredPoint[];
  threshold: number;
  loading: boolean;
  error: string | null;
};

export function useToolCycleData(filters: Filters | null): ToolCycleData {
  const [points, setPoints] = useState<ScatteredPoint[]>([]);
  const [threshold, setThreshold] = useState(0);
  const [loading, setLoading] = useState(false); // Changed to false initially
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!filters) {
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const query = new URLSearchParams({
          from_time: filters.from_time.toString(),
          to_time: filters.to_time.toString(),
          machine_id: filters.machine_id,
        });

        if (filters.tool_sequence) {
          query.append('tool_sequence', filters.tool_sequence);
        }

        const predictionRes = await axios.get(
          '/reportingapp/traceability/v2/prediction_data',
          {
            params: query,
          },
        );

        const predictionPoints: ScatteredPoint[] =
          predictionRes.data.data || [];

        const changelogRes = await axios.get(
          '/reportingapp/traceability/v2/prediction/changelog',
        );
        const changelog = changelogRes.data?.[0];

        const learned_parameters = changelog?.learned_parameters ?? {};

        for (const [tool, info] of Object.entries(learned_parameters)) {
          if (
            typeof info === 'object' &&
            info !== null &&
            'threshold' in info &&
            typeof info.threshold === 'number' &&
            tool === filters.tool_sequence
          ) {
            setThreshold(info.threshold);
          }
        }

        setPoints(predictionPoints);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || 'Error loading Scatter Data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  return { points, threshold, loading, error };
}
