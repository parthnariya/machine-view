import { Alert, Box, CircularProgress, Typography } from '@mui/material';
import {
  Background,
  Controls,
  ReactFlow,
  type Edge,
  type Node,
} from '@xyflow/react';
import { useCallback, useMemo } from 'react';
import '@xyflow/react/dist/style.css';

import Condition from '@/components/UI/Condition';
import { useMachineMapData } from '@/hooks/useMachineMapData';

const TreeVisualization = () => {
  const { data, loading, error } = useMachineMapData();

  const getColor = useCallback(
    (machineId: number, bypassList: number[], notAllowedList: number[]) => {
      if (notAllowedList.includes(machineId)) return '#dc3545';
      if (bypassList.includes(machineId)) return '#007bff';
      return '#ffffff';
    },
    [],
  );

  const { nodes, edges } = useMemo(() => {
    if (!data) return { nodes: [], edges: [] };

    const nodes: Node[] = data.prod_machine_map.map((node, index) => ({
      id: node.id.toString(),
      data: { label: `${node.station_number} - ${node.name}` },
      position: { x: 100 * index, y: 100 * index }, // basic layout
      style: {
        background: getColor(
          node.machine_id,
          data.bypass_list,
          data.not_allowed_list,
        ),
        border: '1px solid #999',
        padding: 10,
        width: 250,
      },
    }));

    const edges: Edge[] = data.prod_machine_map.flatMap((node) =>
      (node.input_stations || []).map((inputId) => ({
        id: `e${inputId}-${node.id}`,
        source: inputId.toString(),
        target: node.id.toString(),
        animated: true,
      })),
    );
    return { nodes, edges };
  }, [data]);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        overflow: 'auto',
      }}
    >
      <Condition>
        <Condition.If condition={loading}>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress />
            <Typography variant="body1" sx={{ ml: 2 }}>
              Loading data...
            </Typography>
          </Box>
        </Condition.If>
        <Condition.ElseIf condition={Boolean(error)}>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Alert severity="error">{error ?? ''}</Alert>
          </Box>
        </Condition.ElseIf>
        <Condition>
          <ReactFlow nodes={nodes} edges={edges} fitView>
            <Background />
            <Controls />
          </ReactFlow>
        </Condition>
      </Condition>
    </Box>
  );
};

export default TreeVisualization;
