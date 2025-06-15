import { Container, Typography } from '@mui/material';

import FilterComponent from '@/components/FilterComponent';

const ScatterDataPage = () => {
  return (
    <Container maxWidth="lg" sx={{ height: '100%' }}>
      <FilterComponent />
      <Container sx={{ backgroundColor: 'lightblue', padding: 2 }}>
        <Typography>List</Typography>
      </Container>
    </Container>
  );
};

export default ScatterDataPage;
