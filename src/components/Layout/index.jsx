import { useState } from "react";
import { Box } from "@mui/material";

import AppBar from "components/AppBar";
import Drawer from "components/Drawer";

import getStyles from "./styles";

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const classes = getStyles({ open });

  const handleDrawer = () => {
    setOpen((state) => !state);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={classes.container}>
      <AppBar open={open} handleDrawerOpen={handleDrawer} />
      <Box sx={classes.content}>{children}</Box>
      <Drawer open={open} handleDrawerClose={handleDrawerClose} />
    </Box>
  );
};

export default Layout;
