import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Link, Typography, useTheme } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { setVotingIssue, updateIssue } from "features/game/gameSlice";
import { toastError } from "common/Toastify";
import Modal from "common/Modal";
import Button, { LoadingButton } from "common/Button";
import Tooltip from "common/Tooltip";
import EditFieldForm from "./EditFieldForm";

import getStyles, { getStoryDetailsModalStyles } from "../styles";

const StoryDetailsModal = ({ onClose, storyId, ...props }) => {
  const [edit, setEdit] = useState("");
  const theme = useTheme();
  const storyDetailsModalClasses = getStoryDetailsModalStyles({ theme });
  //  NOTE: use same styles for buttons block like in IssuesList component
  const classes = getStyles({ theme });
  const { gameId } = useParams();
  const { game, auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const currentStoryDetails = useMemo(() => {
    return (
      game.stories.unpinned?.[storyId] ||
      game.stories.pinnedToTop?.[storyId] ||
      game.stories.pinnedToBottom?.[storyId] ||
      {}
    );
  }, [game.stories, storyId]);

  const resetEdit = () => setEdit("");

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

  const handleSubmit = (fieldName, data) => {
    const callback = resetEdit;
    dispatch(updateIssue({ gameId, id: storyId, data, callback }));
  };

  return (
    <Modal onClose={onClose} {...props} withCloseIcon>
      <Box sx={storyDetailsModalClasses.container}>
        <Box sx={storyDetailsModalClasses.idAndTitleContainer}>
          <Box sx={storyDetailsModalClasses.idContainer}>
            {edit === "order" ? (
              <EditFieldForm
                initialValues={{ order: currentStoryDetails.order }}
                fieldName="order"
                handleCloseForm={resetEdit}
                handleSubmitOutsideOfForm={handleSubmit}
                inputProps={{ style: storyDetailsModalClasses.id }}
              />
            ) : (
              <Typography
                onClick={() => setEdit("order")}
                sx={{
                  ...storyDetailsModalClasses.field,
                  ...storyDetailsModalClasses.id,
                }}
              >
                PT-{currentStoryDetails.order}
              </Typography>
            )}
          </Box>
          {edit === "title" ? (
            <EditFieldForm
              initialValues={{ title: currentStoryDetails.title }}
              fieldName="title"
              handleCloseForm={resetEdit}
              isMultiline
              minRows={3}
              isFullWidth
              handleSubmitOutsideOfForm={handleSubmit}
              inputProps={{
                style: storyDetailsModalClasses.title,
              }}
            />
          ) : (
            <Typography
              sx={{
                ...storyDetailsModalClasses.field,
                ...storyDetailsModalClasses.title,
              }}
              onClick={() => setEdit("title")}
            >
              {currentStoryDetails.title}
            </Typography>
          )}
        </Box>
        <Box sx={storyDetailsModalClasses.linkInfoAndDescriptionContainer}>
          <Box sx={storyDetailsModalClasses.linkAndDescriptionLabelContainer}>
            <Typography sx={storyDetailsModalClasses.linkAndDescriptionLabel}>
              Link
            </Typography>
            {currentStoryDetails?.link && (
              <Button icon onClick={() => setEdit("link")}>
                <EditOutlinedIcon sx={storyDetailsModalClasses.editIcon} />
              </Button>
            )}
          </Box>
          {edit === "link" ? (
            <EditFieldForm
              initialValues={{ link: currentStoryDetails.link }}
              fieldName="link"
              handleCloseForm={resetEdit}
              handleSubmitOutsideOfForm={handleSubmit}
              isFullWidth
            />
          ) : currentStoryDetails?.link ? (
            <Link
              href={currentStoryDetails.link}
              target="_blank"
              underline="hover"
              onClick={() => setEdit("link")}
              sx={storyDetailsModalClasses.linkAndDescription}
            >
              {currentStoryDetails.link}
            </Link>
          ) : (
            <Typography
              onClick={() => setEdit("link")}
              sx={{
                ...storyDetailsModalClasses.field,
                ...storyDetailsModalClasses.emptyLinkAndDescription,
              }}
            >
              Add a link to the issue...
            </Typography>
          )}
        </Box>
        <Box sx={storyDetailsModalClasses.linkInfoAndDescriptionContainer}>
          <Box sx={storyDetailsModalClasses.linkAndDescriptionLabelContainer}>
            <Typography sx={storyDetailsModalClasses.linkAndDescriptionLabel}>
              Description
            </Typography>
            {currentStoryDetails?.description && (
              <Button icon onClick={() => setEdit("description")}>
                <EditOutlinedIcon sx={storyDetailsModalClasses.editIcon} />
              </Button>
            )}
          </Box>
          {edit === "description" ? (
            <EditFieldForm
              initialValues={{ description: currentStoryDetails.description }}
              fieldName="description"
              handleCloseForm={resetEdit}
              handleSubmitOutsideOfForm={handleSubmit}
              inputProps={{ style: storyDetailsModalClasses.descriptionInput }}
              isFullWidth
              isMultiline
              minRows={3}
            />
          ) : currentStoryDetails?.description ? (
            <Typography sx={storyDetailsModalClasses.linkAndDescription}>
              {currentStoryDetails?.description}
            </Typography>
          ) : (
            <Typography
              onClick={() => setEdit("description")}
              sx={{
                ...storyDetailsModalClasses.field,
                ...storyDetailsModalClasses.emptyLinkAndDescription,
              }}
            >
              Add a description...
            </Typography>
          )}
        </Box>
        <Box sx={storyDetailsModalClasses.buttonsContainer}>
          {currentStoryDetails.isVoting ? (
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
              {currentStoryDetails.points ? "Vote again" : "Vote this issue"}
            </LoadingButton>
          )}
          <Tooltip
            title="Story points"
            sx={
              currentStoryDetails.isVoting
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
              {currentStoryDetails.points !== 0
                ? currentStoryDetails.points
                : "-"}
            </Typography>
          </Tooltip>
        </Box>
      </Box>
    </Modal>
  );
};

export default StoryDetailsModal;
