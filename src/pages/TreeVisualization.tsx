import { Alert, Box, CircularProgress, Typography } from '@mui/material';
import {
  Background,
  Controls,
  ReactFlow,
  type Edge,
  type Node,
} from '@xyflow/react';
import { useCallback, useMemo, useState } from 'react';
import '@xyflow/react/dist/style.css';

import NodeEditModal from '@/components/NodeEditorModal';
import Condition from '@/components/UI/Condition';
import { useMachineMapData } from '@/hooks/useMachineMapData';
import { getLayoutedElements } from '@/utils';

const TreeVisualization = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<number | null>(null);

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

    const nodes: Node[] = data.connected_nodes.map((node, index) => ({
      id: node.machine_id.toString(),
      data: { label: `${node.station_number} - ${node.name}` },
      position: { x: 100 * index, y: 100 * index },
      style: {
        background: getColor(
          node.machine_id,
          data.bypass_list,
          data.not_allowed_list,
        ),
        border: '1px solid #999',
        padding: 10,
      },
    }));

    const edges: Edge[] = data.connected_nodes.flatMap((node) =>
      (node.input_stations || []).map((machineId) => ({
        id: `e${machineId}-${node.machine_id}`,
        source: machineId.toString(),
        target: node.machine_id.toString(),
        animated: true,
      })),
    );

    const layoutElements = getLayoutedElements(nodes, edges);

    return { nodes: layoutElements.nodes, edges: layoutElements.edges };
  }, [data]);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        overflow: 'auto',
        border: '1px solid',
        borderRadius: '8px',
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
        <Condition.Else>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodeClick={(e, node) => {
              e.preventDefault();
              setSelectedNodeId(parseInt(node.id));
            }}
          >
            <Background />
            <Controls />
          </ReactFlow>
        </Condition.Else>
      </Condition>
      {selectedNodeId !== null && (
        <NodeEditModal
          nodeId={selectedNodeId}
          onClose={() => {
            setSelectedNodeId(null);
          }}
        />
      )}
    </Box>
  );
};

export default TreeVisualization;
