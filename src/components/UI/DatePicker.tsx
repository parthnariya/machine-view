import { Box, FormControl } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

type DatePickerPropType = {
  label: string;
};

const DatePicker = ({ label }: DatePickerPropType) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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

export default DatePicker;
