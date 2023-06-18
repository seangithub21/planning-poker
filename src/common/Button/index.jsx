import { IconButton, Button as MuiButton } from "@mui/material";
import MuiLoadingButton from "@mui/lab/LoadingButton";

const Button = ({ sx, icon, ...props }) => {
  return icon ? (
    <IconButton sx={{ ...sx }} {...props} />
  ) : (
    <MuiButton
      variant="contained"
      sx={{ borderRadius: "0.8rem", ...sx }}
      {...props}
    />
  );
};

export const LoadingButton = ({ sx, ...props }) => {
  return (
    <MuiLoadingButton
      loading={props?.loading}
      variant="contained"
      sx={{ borderRadius: "0.8rem", ...sx }}
      {...props}
    />
  );
};

export default Button;
