import { useTheme } from "@mui/material";

import Button from "common/Button";

import { getEstimateCardStyles } from "../styles";

const EstimateCard = ({ children, onClick, isChosen, disabled }) => {
  const theme = useTheme();
  const classes = getEstimateCardStyles({ theme, isChosen });

  return (
    <Button
      onClick={() => onClick(children)}
      disabled={disabled}
      variant="outlined"
      sx={classes.estimateCard}
    >
      {children}
    </Button>
  );
};

export default EstimateCard;
