import { TextField, useTheme } from "@mui/material";

//  NOTE: handleChange is propbably unreachable. Consider refactor in the future
const Input = ({ onChange, helperText, form, field, sx, ...props }) => {
  const theme = useTheme();

  const handleChange = (e) => {
    form && form.setFieldValue(field.name, e.target.value);
    onChange && onChange(e.target.value);
  };

  return (
    <TextField
      size="small"
      onChange={handleChange}
      helperText={helperText || " "}
      sx={{
        ...sx,
        "& .MuiInputLabel-root": {
          fontFamily: "UbuntuMedium",
          color: theme.palette.estimateCardDisabled.main,
          "&.Mui-focused": {
            fontFamily: "UbuntuMedium",
            color: theme.palette.text.primary,
          },
        },
      }}
      {...field}
      {...props}
    />
  );
};

export default Input;
