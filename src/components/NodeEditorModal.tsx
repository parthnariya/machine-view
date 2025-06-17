import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { useMachineMapData } from '@/hooks/useMachineMapData';

type NodeType = 'normal' | 'bypass' | 'not_allowed';

interface NodeFormValues {
  id: number;
  machine_id: number;
  name: string;
  station_number: string;
  input_stations: number[];
  nodeType: NodeType;
}

type Props = {
  nodeId: number;
  onClose: () => void;
  onSave?: (updatedNode: NodeFormValues) => void;
};

const NodeEditModal = ({ nodeId, onClose, onSave }: Props) => {
  const { data } = useMachineMapData();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NodeFormValues>({
    defaultValues: {
      id: 0,
      machine_id: 0,
      name: '',
      station_number: '',
      input_stations: [],
      nodeType: 'normal',
    },
  });

  useEffect(() => {
    if (!nodeId || !data) return;

    const node = [...data.connected_nodes, ...data.disconnected_nodes].find(
      (n) => n.machine_id === nodeId,
    );

    if (!node) return;

    const nodeType: NodeType = data.not_allowed_list.includes(node.machine_id)
      ? 'not_allowed'
      : data.bypass_list.includes(node.machine_id)
        ? 'bypass'
        : 'normal';

    reset({
      ...node,
      nodeType,
    });
  }, [nodeId, data, reset]);

  const onSubmit = (formData: NodeFormValues) => {
    if (onSave) onSave(formData);
    onClose();
  };

  if (!nodeId) return null;

  return (
    <Dialog open={!!nodeId} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Node</DialogTitle>
      <DialogContent dividers>
        <Controller
          name="id"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="ID"
              fullWidth
              margin="normal"
              disabled
            />
          )}
        />
        <Controller
          name="machine_id"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Machine ID"
              fullWidth
              margin="normal"
              disabled
            />
          )}
        />
        <Controller
          name="name"
          control={control}
          rules={{ required: 'Name is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Name"
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />
        <Controller
          name="station_number"
          control={control}
          rules={{ required: 'Station Number is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Station Number"
              fullWidth
              margin="normal"
              error={!!errors.station_number}
              helperText={errors.station_number?.message}
            />
          )}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Input Stations</InputLabel>
          <Controller
            name="input_stations"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                multiple
                renderValue={(selected) => selected.join(', ')}
              >
                {data?.connected_nodes.map((node) => (
                  <MenuItem key={node.id} value={node.machine_id}>
                    <Checkbox checked={field.value.includes(node.machine_id)} />
                    <ListItemText
                      primary={`${node.station_number} - ${node.name}`}
                    />
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
        <FormControl margin="normal">
          <Controller
            name="nodeType"
            control={control}
            render={({ field }) => (
              <RadioGroup {...field} row>
                <FormControlLabel
                  value="normal"
                  control={<Radio />}
                  label="Normal"
                />
                <FormControlLabel
                  value="bypass"
                  control={<Radio />}
                  label="Bypass"
                />
                <FormControlLabel
                  value="not_allowed"
                  control={<Radio />}
                  label="Not Allowed"
                />
              </RadioGroup>
            )}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NodeEditModal;
