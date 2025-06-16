import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useState } from 'react';

import CycleLineChart from '@/components/CycleLineChart';
import FilterComponent, {
  type FilterValues,
} from '@/components/FilterComponent';
import ScatteredChart from '@/components/ScatteredChart';
import Condition from '@/components/UI/Condition';
import { useCycleTimeseriesData } from '@/hooks/useCycleTimeseriesData';
import { useToolCycleData } from '@/hooks/useToolCycleData';

const ScatterDataPage = () => {
  const [filters, setFilters] = useState<FilterValues | null>(null);
  const [selectedDotColor, setSelectedDotColor] = useState<string | null>(null);
  const { points, threshold, loading, error } = useToolCycleData(filters);
  const {
    actual,
    error: cycleDataError,
    ideal,
    loading: cycleDataLoading,
  } = useCycleTimeseriesData(filters?.tool_sequence, selectedDotColor);

  const handleFilterSubmit = (newFilters: FilterValues) => {
    setFilters(newFilters);
  };

  const handleReset = () => {
    setFilters(null);
  };

  const handleDotClick = (color: string) => {
    setSelectedDotColor(color);
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
            <ScatteredChart
              points={points}
              threshold={threshold}
              handleDotClick={handleDotClick}
            />
            <Condition>
              <Condition.If condition={cycleDataLoading}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <CircularProgress size={20} />
                  <Typography>Loading signal data...</Typography>
                </Box>
              </Condition.If>
              <Condition.ElseIf condition={Boolean(cycleDataError)}>
                <Alert severity="error">Error: {cycleDataError}</Alert>
              </Condition.ElseIf>
              <Condition.ElseIf condition={Boolean(actual) && Boolean(ideal)}>
                <CycleLineChart actual={actual} ideal={ideal} />
              </Condition.ElseIf>
            </Condition>
          </Condition.Else>
        </Condition>
      </Container>
    </Container>
  );
};

export default ScatterDataPage;
