import { Stack } from '@mui/material';

import Select from './UI/Select';

const FilterComponent = () => {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        px: 1,
        py: 1,
        borderRadius: '8px',
        backgroundColor: (theme) => theme.palette.grey[400],
      }}
    >
      <Select
        label="Machine"
        options={[
          { value: 10, label: 'Ten' },
          { value: 20, label: 'Twenty' },
          { value: 30, label: 'Thirty' },
        ]}
      />
    </Stack>
  );
};

export default FilterComponent;
