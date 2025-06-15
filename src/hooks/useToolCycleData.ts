import { useEffect, useState } from 'react';

import axios from '@/service/axiosService';

type Point = {
  epoch: number;
  tool_sequence: string;
  distance: number;
  anomaly: boolean | null;
  machine_id: string;
  cycle_log_id: number;
  start_time: string;
  end_time: string;
};

type ToolMap = Record<string, number>;
type ThresholdMap = Record<string, number>;

interface Filters {
  from_time: number;
  to_time: number;
  machine_id: string;
  tool_sequence?: string;
}

export interface ToolCycleData {
  points: Point[];
  toolMap: ToolMap;
  thresholdMap: ThresholdMap;
  loading: boolean;
  error: string | null;
}

export function useToolCycleData(filters: Filters | null): ToolCycleData {
  const [points, setPoints] = useState<Point[]>([]);
  const [toolMap, setToolMap] = useState<ToolMap>({});
  const [thresholdMap, setThresholdMap] = useState<ThresholdMap>({});
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

        const predictionPoints: Point[] = predictionRes.data.data || [];

        const changelogRes = await axios.get(
          '/reportingapp/traceability/v2/prediction/changelog',
        );
        const changelog = changelogRes.data?.[0];

        const tool_sequence_map: ToolMap =
          changelog?.config_parameters?.tool_sequence_map ?? {};
        const learned_parameters = changelog?.learned_parameters ?? {};

        const thresholds: ThresholdMap = {};
        for (const [tool, info] of Object.entries(learned_parameters)) {
          if (
            typeof info === 'object' &&
            info !== null &&
            'threshold' in info &&
            typeof info.threshold === 'number'
          ) {
            thresholds[tool] = info.threshold;
          }
        }

        setPoints(predictionPoints);
        setToolMap(tool_sequence_map);
        setThresholdMap(thresholds);
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

  return { points, toolMap, thresholdMap, loading, error };
}
