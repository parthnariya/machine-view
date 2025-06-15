import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from '@mui/material';

type SelectPropType = {
  label: string;
  value: string | number;
  options: { value: number | string; label: string }[];
  onChange?: (value: number | string) => void;
};

const Select = ({ value, onChange, label, options }: SelectPropType) => {
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
          value={value}
          onChange={(e) => {
            e.preventDefault();
            if (onChange) {
              onChange(e.target.value);
            }
          }}
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
