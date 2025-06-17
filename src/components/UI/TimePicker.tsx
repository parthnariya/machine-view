import { Box, FormControl } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker as MuiTimePicker } from '@mui/x-date-pickers/TimePicker';
import moment from 'moment';

type TimePickerPropType = {
  label: string;
  value?: Date | null;
  onChange?: (newDate: Date) => void;
  error?: string;
};

const TimePicker = ({ label, value, onChange, error }: TimePickerPropType) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Box
        sx={{ minWidth: 120, backgroundColor: 'white', borderRadius: '8px' }}
      >
        <FormControl fullWidth size="small">
          <MuiTimePicker
            label={label}
            value={moment(value)}
            onChange={(value) => {
              if (onChange && value) {
                onChange(value.toDate());
              }
            }}
            sx={{
              '& .MuiPickersSectionList-root': {
                width: '100%',
              },
            }}
            slotProps={{
              textField: {
                id: `${label.toLowerCase()}-datepicker`,
                size: 'small',
                variant: 'outlined',
                fullWidth: true,
                InputLabelProps: {
                  htmlFor: `${label.toLowerCase()}-datepicker`,
                  id: `${label.toLowerCase()}-datepicker-label`,
                },
                error: !!error,
              },
            }}
          />
        </FormControl>
      </Box>
    </LocalizationProvider>
  );
};

export default TimePicker;
