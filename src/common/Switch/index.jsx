import { Switch as MuiSwitch } from "@mui/material";

import getStyles from "./styles";

const Switch = ({ sx, ...props }) => {
  const classes = getStyles();

  return (
    <MuiSwitch
      disableRipple
      focusVisibleClassName=".Mui-focusVisible"
      sx={{ ...classes.switch, ...sx }}
      {...props}
    />
  );
};

export default Switch;
