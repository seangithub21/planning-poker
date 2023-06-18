import { Box, List, ListItem, Typography, useTheme } from "@mui/material";

import usePointsCounter from "hooks/usePointsCounter";
import ResultsCard from "./ResultsCard";

import getStyles from "../styles";

const Results = () => {
  const theme = useTheme();
  const { groupedPoints, average } = usePointsCounter();
  const classes = getStyles({ theme });

  return (
    <Box sx={classes.containerResults}>
      <List sx={classes.pointsList}>
        {!!groupedPoints.length &&
          groupedPoints.map((point, index) => (
            <ListItem key={index} disablePadding sx={classes.pointsListItem}>
              <ResultsCard>{point}</ResultsCard>
            </ListItem>
          ))}
      </List>
      <Box sx={classes.containerResultsSpacing}></Box>
      <Box sx={classes.averageContainer}>
        <Box sx={classes.averageContainerTop}>
          <Typography sx={classes.averageTitle}>Average:</Typography>
          <Typography sx={classes.averageText}>{average}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Results;
