import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = ({ sx }) => {
  return (
    <Box sx={{ display: "flex", ...sx }}>
      <CircularProgress />
    </Box>
  );
};

export default Loading;
