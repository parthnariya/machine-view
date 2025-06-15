import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from '@mui/material';

type SelectPropType = {
  label: string;
  options: { value: number; label: string }[];
};

const Select = ({ label, options }: SelectPropType) => {
  return (
    <Box sx={{ minWidth: 120, backgroundColor: 'white', borderRadius: '8px' }}>
      <FormControl fullWidth size="small">
        <InputLabel id={`${label.toLocaleLowerCase()}-select-label`}>
          {label}
        </InputLabel>
        <MuiSelect
          labelId={`${label.toLocaleLowerCase()}-select-label`}
          id={`${label.toLocaleLowerCase()}-select`}
          label={label}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </MuiSelect>
      </FormControl>
    </Box>
  );
};

export default Select;
