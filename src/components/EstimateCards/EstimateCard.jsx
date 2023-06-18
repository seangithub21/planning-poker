import { Box, Typography, useTheme } from "@mui/material";

const EstimateCard = ({ children }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: `.2rem solid ${theme.palette.primary.main}`,
        borderRadius: ".8rem",
        width: "4.8rem",
        height: "8rem",
        color: theme.palette.primary.main,
        cursor: "pointer",
        transitionDuration: ".1s",
        "&:hover": {
          marginTop: "-.5rem",
          backgroundColor: "#d7e9ff",
        },
      }}
    >
      <Typography
        sx={{
          fontWeight: 700,
        }}
      >
        {children}
      </Typography>
    </Box>
  );
};

export default EstimateCard;
