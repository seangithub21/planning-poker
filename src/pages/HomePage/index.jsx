import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";

import { getGameId } from "utils/localStorage";
import cardGame from "assets/Planning-Poker.png";
import Button from "common/Button";

import getStyles from "./styles";

const HomePage = () => {
  const theme = useTheme();
  const classes = getStyles({ theme });
  const navigate = useNavigate();

  useEffect(() => {
    getGameId() && navigate(`/${getGameId()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickStartGame = () => {
    navigate("create-game");
  };

  return (
    <Box sx={classes.container}>
      <Box sx={classes.blockLeft}>
        <Typography variant="h1">
          Scrum Poker for agile development teams
        </Typography>
        <p>
          Have fun while being productive with our simple and complete tool.
        </p>
        <Button
          size="medium"
          sx={classes.blockLeftButton}
          onClick={handleClickStartGame}
        >
          Start new game
        </Button>
      </Box>
      <Box sx={classes.blockRight}>
        <Box sx={classes.blockRightImage}>
          <img alt="Card game" src={cardGame} />
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
