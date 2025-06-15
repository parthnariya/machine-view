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
import { useToolCycleData } from '@/hooks/useToolCycleData';

const ScatterDataPage = () => {
  const [filters, setFilters] = useState<FilterValues | null>(null);
  const { points, toolMap, thresholdMap, loading, error } =
    useToolCycleData(filters);

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

      <Container sx={{ backgroundColor: 'lightblue', padding: 2 }}>
        {!filters ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              Please submit the filter form to load data
            </Typography>
          </Box>
        ) : loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
            <Typography variant="body1" sx={{ ml: 2 }}>
              Loading data...
            </Typography>
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            Error: {error}
          </Alert>
        ) : (
          <Box>
            <Typography variant="h6" gutterBottom>
              Data Results
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Total Points: {points.length}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Tools Available: {Object.keys(toolMap).length}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Thresholds Available: {Object.keys(thresholdMap).length}
            </Typography>

            <Box
              sx={{
                mt: 2,
                p: 2,
                backgroundColor: 'rgba(0,0,0,0.1)',
                borderRadius: 1,
              }}
            >
              <Typography variant="caption" display="block">
                Current Filters: {JSON.stringify(filters, null, 2)}
              </Typography>
            </Box>
          </Box>
        )}
      </Container>
    </Container>
  );
};

export default ScatterDataPage;
