import { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";

import usePointsCounter from "hooks/usePointsCounter";

import { getResultsCardStyles } from "../styles";

const ResultsCard = ({ children }) => {
  const [voteQuantity, setVoteQuantity] = useState(0);
  const [progress, setProgress] = useState(0);
  const theme = useTheme();
  const { totalPoints } = usePointsCounter();
  const classes = getResultsCardStyles({ theme, progress });

  useEffect(() => {
    totalPoints.forEach(
      (point) => point === children && setVoteQuantity((state) => (state += 1))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    voteQuantity && setProgress((100 / totalPoints.length) * voteQuantity);
  }, [voteQuantity, totalPoints]);

  return (
    <Box sx={classes.container}>
      <Box sx={classes.progressBarContainer}>
        <Box sx={classes.progressBar}>
          <Box
            sx={{ ...classes.progressBarFill, height: `${progress}%` }}
          ></Box>
        </Box>
      </Box>
      <Box sx={classes.cardContainer}>
        <Box sx={classes.card}>
          <Typography>{children}</Typography>
        </Box>
        <Typography sx={classes.voteQuantity}>
          {voteQuantity} {voteQuantity === 1 ? "Vote" : "Votes"}
        </Typography>
      </Box>
    </Box>
  );
};

export default ResultsCard;
