import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useState } from 'react';

import FilterComponent, {
  type FilterValues,
} from '@/components/FilterComponent';
import ScatteredChart from '@/components/ScatteredChart';
import Condition from '@/components/UI/Condition';
import { useToolCycleData } from '@/hooks/useToolCycleData';

const ScatterDataPage = () => {
  const [filters, setFilters] = useState<FilterValues | null>(null);
  const { points, threshold, loading, error } = useToolCycleData(filters);

  const handleFilterSubmit = (newFilters: FilterValues) => {
    setFilters(newFilters);
  };

  const handleReset = () => {
    setFilters(null);
  };

  return (
    <Container maxWidth="xl" sx={{ height: '100%', padding: 0 }}>
      <FilterComponent
        onFilterSubmit={handleFilterSubmit}
        onReset={handleReset}
      />

      <Container sx={{ padding: 2 }}>
        <Condition>
          <Condition.If condition={!filters}>
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" color="text.secondary">
                Please submit the filter form to load data
              </Typography>
            </Box>
          </Condition.If>
          <Condition.ElseIf condition={Boolean(loading)}>
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
              <Typography variant="body1" sx={{ ml: 2 }}>
                Loading data...
              </Typography>
            </Box>
          </Condition.ElseIf>
          <Condition.ElseIf condition={Boolean(error)}>
            <Alert severity="error" sx={{ mb: 2 }}>
              Error: {error}
            </Alert>
          </Condition.ElseIf>
          <Condition.Else>
            <ScatteredChart points={points} threshold={threshold} />
          </Condition.Else>
        </Condition>
      </Container>
    </Container>
  );
};

export default ScatterDataPage;
