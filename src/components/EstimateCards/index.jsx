import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import votingSystem from "pages/CreateGamePage/votingSystem";
import EstimateCard from "./EstimateCard";

const EstimateCards = () => {
  const game = useSelector((state) => state.game);

  const cardsToDisplay =
    game?.currentGame?.votingSystem &&
    votingSystem.find(
      (system) => system.value === game.currentGame.votingSystem
    )?.cards;

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography sx={{ mb: "2rem" }}>Choose your card 👇</Typography>
      <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        {cardsToDisplay?.map((card) => (
          <EstimateCard key={card}>{card}</EstimateCard>
        ))}
      </Box>
    </Box>
  );
};

export default EstimateCards;
