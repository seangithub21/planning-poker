import { Box, Modal as MuiModal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import getStyles from "./styles";

//  NOTE: fix responsiveness later
const Modal = ({ children, sx, withCloseIcon, ...props }) => {
  const classes = getStyles();

  return (
    <MuiModal {...props}>
      <Box sx={{ ...classes.container, ...sx }}>
        <Box sx={{ textAlign: "right" }}>
          {withCloseIcon && (
            <CloseIcon onClick={props.onClose} sx={classes.cross} />
          )}
        </Box>
        {children}
      </Box>
    </MuiModal>
  );
};

export default Modal;
