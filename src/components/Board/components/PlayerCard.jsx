import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { FINISHED_COUNTING } from "constants/gameState";

import { getPlayerCardStyles } from "../styles";

const PlayerCard = ({ sx, cardChosen, name, isSpectator }) => {
  const { game } = useSelector((state) => state);
  const classes = getPlayerCardStyles({
    cardChosen: cardChosen === 0 ? true : cardChosen,
    finishedCounting: game.currentGame?.state === FINISHED_COUNTING,
  });

  return (
    <Box sx={{ ...classes.container, ...sx }}>
      <Box sx={classes.cardContainer}>
        {isSpectator ? (
          <Box sx={classes.spectatorCard}>
            <VisibilityIcon sx={classes.spectatorCardIcon} />
          </Box>
        ) : (
          <Box sx={classes.cardContainerInner}>
            <Box sx={{ ...classes.card, ...classes.cardBackSide }}></Box>
            <Box sx={{ ...classes.card, ...classes.cardValueSide }}>
              <Typography sx={classes.cardValueText}>{cardChosen}</Typography>
            </Box>
          </Box>
        )}
      </Box>
      <Typography sx={classes.name}>{name}</Typography>
    </Box>
  );
};

export default PlayerCard;
