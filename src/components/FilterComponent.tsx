import { Button, Stack } from '@mui/material';

import DatePicker from './UI/DatePicker';
import Select from './UI/Select';
import TimePicker from './UI/TimePicker';

const FilterComponent = () => {
  return (
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
      <Select
        label="Machine"
        options={[
          { value: 10, label: 'Ten' },
          { value: 20, label: 'Twenty' },
          { value: 30, label: 'Thirty' },
        ]}
      />
      <DatePicker label="Start Date" />
      <TimePicker label="Start Time" />
      <DatePicker label="End Date" />
      <TimePicker label="End Time" />
      <Select
        label="Select Tool"
        options={[
          { value: 10, label: 'Ten' },
          { value: 20, label: 'Twenty' },
          { value: 30, label: 'Thirty' },
        ]}
      />
      <Button variant="contained" sx={{ textTransform: 'none' }}>
        Search
      </Button>
      <Button variant="outlined" sx={{ textTransform: 'none' }}>
        Show Comparison
      </Button>
    </Stack>
  );
};

export default FilterComponent;
