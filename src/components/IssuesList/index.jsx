import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  useTheme,
  ListItem,
  ListItemButton,
  List,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { pinIssue, setVotingIssue } from "features/game/gameSlice";
import { toastError } from "common/Toastify";
import DropDownMenu from "common/DropDownMenu";
import { LoadingButton } from "common/Button";
import Tooltip from "common/Tooltip";
import StoryDetailsModal from "./components/StoryDetailsModal";
import StoryDeleteModal from "./components/StoryDeleteModal";

import getStyles from "./styles";

const issueActionOptions = [
  { label: "Open", value: "open" },
  { label: "Move to top", value: "top" },
  { label: "Move to bottom", value: "bottom" },
  { label: "Delete", value: "delete" },
];

const IssuesList = () => {
  const [currentStoryId, setCurrentStoryId] = useState("");
  const [issueIdToDelete, setIssueIdToDelete] = useState("");
  const theme = useTheme();
  const classes = getStyles({ theme });
  const { game, auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { gameId } = useParams();

  const handleResetCurrentStoryDetails = () => setCurrentStoryId("");

  const handleResetIssueIdToDelete = () => setIssueIdToDelete("");

  const handleChooseIssueAction = (action, issueId) => {
    if (action === "delete") {
      setIssueIdToDelete(issueId);
    }
    if (action === "top" || action === "bottom") {
      dispatch(pinIssue({ gameId, id: issueId, pinned: action }));
    }
    if (action === "open") {
      setCurrentStoryId(issueId);
    }
  };

  const handleVoteIssue = (id) => {
    const canManageIssues = game.currentGame?.issueManageBy?.some(
      (playerId) => playerId === auth.user?.uid || playerId === "allPlayers"
    );
    if (canManageIssues) {
      dispatch(setVotingIssue({ id, gameId }));
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

  const storiesContent = (stories) => {
    return (
      stories &&
      Object.keys(stories).map((storyId) => (
        <ListItem disablePadding key={storyId}>
          <ListItemButton
            disableRipple
            sx={
              stories[storyId].isVoting
                ? {
                    ...classes.listItem,
                    backgroundColor: theme.palette.votingIssue.main,
                    "&:hover": {
                      backgroundColor: theme.palette.votingIssue.hover,
                    },
                  }
                : { ...classes.listItem }
            }
          >
            <Box sx={classes.listItemTopBottom}>
              <Typography sx={{ color: "#48545d", fontSize: "1.4rem" }}>
                PT-{stories[storyId].order}
              </Typography>
              <DropDownMenu
                menuItems={issueActionOptions}
                handleClickMenuItem={handleChooseIssueAction}
                listItemId={storyId}
                isIconButton
                icon={<MoreHorizIcon fontSize="large" />}
              />
            </Box>
            <Box sx={classes.listItemTitle}>
              <Typography>{stories[storyId].title}</Typography>
            </Box>
            <Box sx={classes.listItemTopBottom}>
              {stories[storyId].isVoting ? (
                <LoadingButton
                  loading={game.isLoadingIssue}
                  sx={{ fontSize: "1.6rem" }}
                  onClick={() => handleVoteIssue(storyId)}
                >
                  Voting now...
                </LoadingButton>
              ) : (
                <LoadingButton
                  loading={game.isLoadingIssue}
                  sx={classes.voteIssueButton}
                  onClick={() => handleVoteIssue(storyId)}
                >
                  {stories[storyId].points ? "Vote again" : "Vote this issue"}
                </LoadingButton>
              )}
              <Tooltip
                title="Story points"
                sx={
                  stories[storyId].isVoting
                    ? {
                        ...classes.issuePoints,
                        backgroundColor: theme.palette.background.default,
                      }
                    : {
                        ...classes.issuePoints,
                      }
                }
                placement="bottom-end"
              >
                <Typography>
                  {stories[storyId].points !== 0
                    ? stories[storyId].points
                    : "-"}
                </Typography>
              </Tooltip>
            </Box>
          </ListItemButton>
        </ListItem>
      ))
    );
  };

  return (
    <>
      <List>
        {storiesContent(game.stories?.pinnedToTop)}
        {storiesContent(game.stories?.unpinned)}
        {storiesContent(game.stories?.pinnedToBottom)}
      </List>
      <StoryDetailsModal
        open={!!currentStoryId}
        onClose={handleResetCurrentStoryDetails}
        storyId={currentStoryId}
      />
      <StoryDeleteModal
        open={!!issueIdToDelete}
        onClose={handleResetIssueIdToDelete}
        storyId={issueIdToDelete}
      />
    </>
  );
};

export default IssuesList;
