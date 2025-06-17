import { Box, FormControl } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment';

type DatePickerPropType = {
  label: string;
  value?: Date | null;
  onChange?: (newDate: Date) => void;
  error?: string;
};

const DatePicker = ({ label, onChange, value, error }: DatePickerPropType) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Box
        sx={{ minWidth: 120, backgroundColor: 'white', borderRadius: '8px' }}
      >
        <FormControl fullWidth size="small">
          <MuiDatePicker
            label={label}
            sx={{
              '& .MuiPickersSectionList-root': {
                width: '100%',
              },
            }}
            value={moment(value)}
            onChange={(value) => {
              if (onChange && value) {
                onChange(value.toDate());
              }
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

export default DatePicker;
