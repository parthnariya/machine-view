import { useEffect, useState } from 'react';

import axios from '@/service/axiosService';

export type MachineNode = {
  id: number;
  machine_id: number;
  name: string;
  station_number: string;
  input_stations: number[];
};

export type MachineMapData = {
  bypass_list: number[];
  not_allowed_list: number[];
  connected_nodes: MachineNode[];
  disconnected_nodes: Omit<MachineNode, 'input_stations'>[];
};

export const useMachineMapData = () => {
  const [data, setData] = useState<MachineMapData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMachineMap = async () => {
      try {
        const response = await axios.get('/noviga/prodmachinemap/219');
        setData(response.data);
      } catch (err) {
        if (err instanceof Error) {
          setError('Failed to load Data!!');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMachineMap();
  }, []);

  return { data, loading, error };
};
