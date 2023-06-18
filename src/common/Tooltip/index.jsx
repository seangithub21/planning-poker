import { Tooltip as MuiTooltip } from "@mui/material";
import React from "react";

const Tooltip = ({ children, ...props }) => {
  return <MuiTooltip {...props}>{children}</MuiTooltip>;
};

export default Tooltip;
