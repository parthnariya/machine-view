import { Container, Typography } from '@mui/material';

import FilterComponent from '@/components/FilterComponent';

const ScatterDataPage = () => {
  return (
    <Container maxWidth="xl" sx={{ height: '100%', padding: 0 }}>
      <FilterComponent />
      <Container sx={{ backgroundColor: 'lightblue', padding: 2 }}>
        <Typography>List</Typography>
      </Container>
    </Container>
  );
};

export default ScatterDataPage;
