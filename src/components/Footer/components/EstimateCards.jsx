import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";

import { chooseCard } from "features/game/gameSlice";
import votingSystem from "pages/CreateGamePage/votingSystem";
import { DISCUSSING } from "constants/gameState";
import EstimateCard from "./EstimateCard";

import getStyles from "../styles";

const EstimateCards = () => {
  const { gameId } = useParams();
  const { game, auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const theme = useTheme();
  const classes = getStyles({ theme });

  const cardsToDisplay =
    game?.currentGame?.votingSystem &&
    votingSystem.find(
      (system) => system.value === game.currentGame.votingSystem
    )?.cards;

  const title =
    game.currentGame?.state === DISCUSSING
      ? "Choose your card 👇"
      : "Counting votes...";

  const handleChoseCard = (card) => {
    if (auth.user?.cardChosen || auth.user?.cardChosen === 0) {
      dispatch(chooseCard({ card: null, gameId }));
    } else {
      dispatch(chooseCard({ card, gameId }));
    }
  };

  return (
    <Box sx={classes.container}>
      <Typography sx={classes.title}>{title}</Typography>
      <Box sx={classes.estimateCardsContainer}>
        {cardsToDisplay?.map((card) => (
          <EstimateCard
            onClick={handleChoseCard}
            disabled={game.currentGame?.state !== DISCUSSING}
            key={card}
            isChosen={auth.user?.cardChosen === card}
          >
            {card}
          </EstimateCard>
        ))}
      </Box>
    </Box>
  );
};

export default EstimateCards;
