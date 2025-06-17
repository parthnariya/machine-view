import { Typography, Box, CircularProgress, Alert } from '@mui/material';
import { useState } from 'react';

import type { ScatteredPoint } from '@/types';

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
  const { points, threshold, loading, error } = useToolCycleData(filters);
  const {
    actual,
    error: cycleDataError,
    ideal,
    loading: cycleDataLoading,
    fetchCycleData,
    resetState,
  } = useCycleTimeseriesData();

  const handleFilterSubmit = (newFilters: FilterValues) => {
    resetState();
    setFilters(newFilters);
  };

  const handleReset = () => {
    setFilters(null);
  };

  const handleDotClick = async (point: ScatteredPoint) => {
    await fetchCycleData(point, filters?.tool_sequence);
  };

  console.log(`ideal ${ideal?.length}, keys ${Object.keys(actual).length}`);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          boxShadow: 1,
        }}
      >
        <FilterComponent
          onFilterSubmit={handleFilterSubmit}
          onReset={handleReset}
        />
      </Box>

      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          p: 2,
          marginBottom: 6,
        }}
      >
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
              <Condition.ElseIf
                condition={Object.keys(actual).length > 0 && ideal?.length > 0}
              >
                <CycleLineChart actual={actual} ideal={ideal} />
              </Condition.ElseIf>
            </Condition>
          </Condition.Else>
        </Condition>
      </Box>
    </Box>
  );
};

export default ScatterDataPage;
