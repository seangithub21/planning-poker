import { Box } from "@mui/material";

import getStyles from "../styles";

const DrawerHeader = ({ children, ...props }) => {
  const classes = getStyles();

  return <Box sx={classes.drawerHeader}>{children}</Box>;
};

export default DrawerHeader;
