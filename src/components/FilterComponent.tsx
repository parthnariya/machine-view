import { Button, Stack } from '@mui/material';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';

import DatePicker from './UI/DatePicker';
import Select from './UI/Select';
import TimePicker from './UI/TimePicker';

import { machineOptions, toolOptions } from '@/constants';

type FilterFormData = {
  machine_id: string;
  tool: string;
  start_date: Date | null;
  start_time: Date | null;
  end_date: Date | null;
  end_time: Date | null;
};

export interface FilterValues {
  machine_id: string;
  tool_sequence?: string;
  from_time: number;
  to_time: number;
}

interface FilterComponentProps {
  onFilterSubmit: (filters: FilterValues) => void;
  onReset: () => void;
}

const FilterComponent = ({ onFilterSubmit, onReset }: FilterComponentProps) => {
  const { handleSubmit, control, reset } = useForm<FilterFormData>({
    defaultValues: {
      end_date: null,
      end_time: null,
      start_date: null,
      start_time: null,
      machine_id: '',
      tool: '',
    },
  });

  const onSubmit: SubmitHandler<FilterFormData> = (data) => {
    const getEpoch = (date: Date | null, time: Date | null): number | null => {
      if (!date || !time) return null;
      const combined = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time.getHours(),
        time.getMinutes(),
        time.getSeconds(),
      );
      return Math.floor(combined.getTime() / 1000);
    };

    const start_time = getEpoch(data.start_date, data.start_time);
    const end_time = getEpoch(data.end_date, data.end_time);
    if (!data.machine_id || !start_time || !end_time) {
      console.error('Please fill in all required fields');
      return;
    }

    const filters: FilterValues = {
      machine_id: data.machine_id,
      from_time: start_time,
      to_time: end_time,
    };

    if (data.tool) {
      filters.tool_sequence = data.tool;
    }

    onFilterSubmit(filters);
  };

  const handleReset = () => {
    reset();
    onReset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        direction="row"
        sx={{
          px: 1,
          py: 1,
          borderRadius: '8px',
          backgroundColor: (theme) => theme.palette.grey[400],
        }}
        rowGap={1}
        columnGap={1}
        flexWrap={'wrap'}
      >
        <Controller
          name="machine_id"
          control={control}
          rules={{ required: 'Machine is required' }}
          render={({ field, fieldState }) => (
            <Select
              label="Machine"
              options={machineOptions}
              value={field.value}
              onChange={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="start_date"
          control={control}
          rules={{ required: 'Start date is required' }}
          render={({ field, fieldState }) => (
            <DatePicker
              label="Start Date"
              value={field.value}
              onChange={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="start_time"
          control={control}
          rules={{ required: 'Start time is required' }}
          render={({ field, fieldState }) => (
            <TimePicker
              label="Start Time"
              value={field.value}
              onChange={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="end_date"
          control={control}
          rules={{ required: 'End date is required' }}
          render={({ field, fieldState }) => (
            <DatePicker
              label="End Date"
              value={field.value}
              onChange={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="end_time"
          control={control}
          rules={{ required: 'End time is required' }}
          render={({ field, fieldState }) => (
            <TimePicker
              label="End Time"
              value={field.value}
              onChange={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="tool"
          control={control}
          rules={{ required: 'Tool is required' }}
          render={({ field, fieldState }) => (
            <Select
              label="Select Tool"
              options={toolOptions}
              value={field.value}
              onChange={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ textTransform: 'none' }}
        >
          Search
        </Button>
        <Button
          variant="outlined"
          sx={{ textTransform: 'none' }}
          onClick={handleReset}
          type="button"
        >
          Show Comparison
        </Button>
      </Stack>
    </form>
  );
};

export default FilterComponent;
