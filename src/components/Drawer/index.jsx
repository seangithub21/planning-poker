import { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Drawer as MuiDrawer, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import DrawerHeader from "./components/DrawerHeader";
import AddIssueForm from "./components/AddIssueForm";
import IssuesList from "components/IssuesList";
import Button from "common/Button";
import { toastError } from "common/Toastify";

import getStyles from "./styles";

const Drawer = ({ open, handleDrawerClose, ...props }) => {
  const classes = getStyles();
  const [isIssueFormOpen, setIsIssueFormOpen] = useState(false);
  const { game, auth } = useSelector((state) => state);

  const handleOpenIssueForm = () => {
    const canManageIssues = game.currentGame?.issueManageBy?.some(
      (playerId) => playerId === auth.user?.uid || playerId === "allPlayers"
    );
    if (canManageIssues) {
      setIsIssueFormOpen(true);
    } else {
      toastError(
        <>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Typography sx={{ fontFamily: "UbuntuRegular" }}>
              You don't have permission to manage issues
            </Typography>
            <Typography sx={{ color: "#8490a3", fontFamily: "UbuntuRegular" }}>
              Change "who can manage issues" at game settings
            </Typography>
          </Box>
        </>
      );
    }
  };

  const handleCloseIssueForm = () => {
    setIsIssueFormOpen(false);
  };

  return (
    <MuiDrawer
      variant="persistent"
      anchor="right"
      open={open}
      sx={classes.drawer}
    >
      <DrawerHeader>
        <Typography sx={classes.drawerHeaderTitle}>Issues</Typography>
        <CloseIcon onClick={handleDrawerClose} sx={classes.cross} />
      </DrawerHeader>
      <IssuesList />
      {isIssueFormOpen ? (
        <AddIssueForm handleCloseIssueForm={handleCloseIssueForm} />
      ) : (
        <Button variant="text" onClick={handleOpenIssueForm}>
          + Add an issue
        </Button>
      )}
    </MuiDrawer>
  );
};

export default Drawer;
