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

const FilterComponent = () => {
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
    console.log(data);
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
      return combined.getTime();
    };

    const start_time = getEpoch(data.start_date, data.start_time);
    const end_time = getEpoch(data.end_date, data.end_time);

    const result = {
      machine_id: data.machine_id,
      tool: data.tool,
      start_time,
      end_time,
    };

    console.log(result);
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
          render={({ field }) => (
            <Select
              label="Machine"
              options={machineOptions}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          name="start_date"
          control={control}
          render={({ field }) => (
            <DatePicker
              label="Start Date"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          name="start_time"
          control={control}
          render={({ field }) => (
            <TimePicker
              label="Start Time"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          name="end_date"
          control={control}
          render={({ field }) => (
            <DatePicker
              label="End Date"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          name="end_time"
          control={control}
          render={({ field }) => (
            <TimePicker
              label="End Time"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          name="tool"
          control={control}
          render={({ field }) => (
            <Select
              label="Select Tool"
              options={toolOptions}
              value={field.value}
              onChange={field.onChange}
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
          onClick={() => reset()}
          type="button"
        >
          Show Comparison
        </Button>
      </Stack>
    </form>
  );
};

export default FilterComponent;
