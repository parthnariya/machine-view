export type ScatteredPoint = {
  epoch: number;
  tool_sequence: string;
  distance: number;
  anomaly: boolean | null;
  machine_id: string;
  cycle_log_id: number;
  start_time: string;
  end_time: string;
};

export type Filters = {
  from_time: number;
  to_time: number;
  machine_id: string;
  tool_sequence?: string;
};

export type MachineNode = {
  id: number;
  machine_id: number;
  name: string;
  station_number: string;
  input_stations: number[];
};
