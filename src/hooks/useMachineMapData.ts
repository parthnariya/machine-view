import axios from 'axios';
import { useEffect, useState } from 'react';

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
  prod_machine_map: MachineNode[];
};

export const useMachineMapData = () => {
  const [data, setData] = useState<MachineMapData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMachineMap = async () => {
      try {
        const response = await axios.get<MachineMapData>(
          '/noviga/prodmachinemap/219',
        );
        setData(response.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchMachineMap();
  }, []);

  return { data, loading, error };
};
