import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import { toggleSpectatorMode } from "features/auth/authSlice";
import Button from "common/Button";

import { getSpectatorModeStyles } from "../styles";

const SpectatorMode = () => {
  const classes = getSpectatorModeStyles();
  const { gameId } = useParams();
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleDeactivate = () => {
    const data = { spectatorMode: !auth.user.spectatorMode };
    dispatch(toggleSpectatorMode({ gameId, userData: auth.user, data }));
  };

  return (
    <Box sx={classes.container}>
      <Typography sx={classes.message}>You are in spectator mode 👁</Typography>
      <Button variant="text" onClick={handleDeactivate}>
        Deactivate
      </Button>
    </Box>
  );
};

export default SpectatorMode;
