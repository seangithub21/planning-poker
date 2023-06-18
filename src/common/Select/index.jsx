import ReactSelect from "react-select";
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  Select as MaterialUISelect,
  OutlinedInput,
  useTheme,
} from "@mui/material";

export const Select = ({ ...props }) => {
  return (
    <Box sx={props.sx}>
      <ReactSelect
        {...props}
        components={{ IndicatorSeparator: () => null }}
        placeholder={props.placeholder || "Select"}
        isDisabled={props.disabled || false}
      />
    </Box>
  );
};

export const FormSelect = ({
  form,
  field,
  onChange,
  disabled = false,
  ...props
}) => {
  const handleChange = (option) => {
    if (onChange) {
      onChange(option);
    } else {
      form.setFieldValue(field.name, option);
    }
  };

  return (
    <Select
      {...props}
      {...field}
      form={form}
      disabled={disabled}
      onChange={handleChange}
    />
  );
};

export const MuiSelect = ({
  onChange,
  form,
  field,
  label,
  fullWidth,
  helperText,
  sx,
  ...props
}) => {
  const theme = useTheme();

  const handleChange = (event) => {
    if (onChange) {
      onChange(event, field, form);
    } else {
      form && form.setFieldValue(field.name, event.target.value);
    }
  };

  return (
    <FormControl fullWidth={fullWidth}>
      <InputLabel
        size="small"
        sx={{
          fontFamily: "UbuntuMedium",
          color: theme.palette.estimateCardDisabled.main,
          "&.Mui-focused": {
            fontFamily: "UbuntuMedium",
            color: theme.palette.text.primary,
          },
        }}
      >
        {label}
      </InputLabel>
      <MaterialUISelect
        size="small"
        input={<OutlinedInput label={label} />}
        sx={{ ...sx }}
        //  NOTE: field below spreads redundant onChange listener as well. Consider refactor in the future
        {...field}
        {...props}
        onChange={handleChange}
      />
      <FormHelperText>{helperText || " "}</FormHelperText>
    </FormControl>
  );
};
