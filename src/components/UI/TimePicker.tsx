import { Box, FormControl } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker as MuiTimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';

type TimePickerPropType = {
  label: string;
  value?: Date | null;
  onChange?: (newDate: Date) => void;
};

const TimePicker = ({ label, value, onChange }: TimePickerPropType) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{ minWidth: 120, backgroundColor: 'white', borderRadius: '8px' }}
      >
        <FormControl fullWidth size="small">
          <MuiTimePicker
            label={label}
            value={dayjs(value)}
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
              },
            }}
          />
        </FormControl>
      </Box>
    </LocalizationProvider>
  );
};

export default TimePicker;
