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

import type { MachineNode } from '@/types';

import NodeEditModal from '@/components/NodeEditorModal';
import Condition from '@/components/UI/Condition';
import { useMachineMapData } from '@/hooks/useMachineMapData';
import { getLayoutedElements } from '@/utils';

const TreeVisualization = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<number | null>(null);
  const [editedNodes, setEditedNodes] = useState<MachineNode[] | null>(null);
  const [byPassList, setBypassList] = useState<number[] | null>(null);
  const [notAllowedList, setNotAllowedList] = useState<number[] | null>(null);

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

    const workingNodes = editedNodes ?? data.connected_nodes;

    const nodes: Node[] = workingNodes.map((node, index) => ({
      id: node.machine_id.toString(),
      data: { label: `${node.station_number} - ${node.name}` },
      position: { x: 100 * index, y: 100 * index },
      style: {
        background: getColor(
          node.machine_id,
          byPassList ?? data.bypass_list,
          notAllowedList ?? data.not_allowed_list,
        ),
        border: '1px solid #999',
        padding: 10,
      },
    }));

    const edges: Edge[] = workingNodes.flatMap((node) =>
      (node.input_stations || []).map((machineId) => ({
        id: `e${machineId}-${node.machine_id}`,
        source: machineId.toString(),
        target: node.machine_id.toString(),
        animated: true,
      })),
    );

    const layoutElements = getLayoutedElements(nodes, edges);

    return { nodes: layoutElements.nodes, edges: layoutElements.edges };
  }, [data, editedNodes, byPassList, notAllowedList]);

  const handleSave = (
    updatedNode: MachineNode & {
      nodeType?: 'normal' | 'bypass' | 'not_allowed';
    },
  ) => {
    if (!data) return;

    if (updatedNode.nodeType === 'bypass') {
      const refBypassList = byPassList ?? data.bypass_list;
      const isBypassIdExist = refBypassList.find(
        (id) => id === updatedNode.machine_id,
      );
      if (!isBypassIdExist) {
        refBypassList.push(updatedNode.machine_id);
        setBypassList(refBypassList);
      }
    }

    if (updatedNode.nodeType === 'not_allowed') {
      const refNotAllowedList = notAllowedList ?? data.not_allowed_list;
      const isNotAllowedIdExist = refNotAllowedList.find(
        (id) => id === updatedNode.machine_id,
      );
      if (!isNotAllowedIdExist) {
        refNotAllowedList.push(updatedNode.machine_id);
        setNotAllowedList(refNotAllowedList);
      }
    }

    delete updatedNode.nodeType;

    const updatedList = (editedNodes ?? data.connected_nodes).map((node) =>
      node.machine_id === updatedNode.machine_id
        ? {
            ...node,
            name: updatedNode.name,
            station_number: updatedNode.station_number,
            input_stations: updatedNode.input_stations,
            machine_id: node.machine_id,
          }
        : node,
    );

    setEditedNodes(updatedList);
    setSelectedNodeId(null);
  };

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
          onSave={handleSave}
        />
      )}
    </Box>
  );
};

export default TreeVisualization;
