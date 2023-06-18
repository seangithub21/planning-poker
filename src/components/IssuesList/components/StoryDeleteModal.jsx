import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";

import { deleteIssue } from "features/game/gameSlice";
import Modal from "common/Modal";
import Button from "common/Button";

import { getStoryDeleteModalStyles } from "../styles";

const StoryDeleteModal = ({ onClose, storyId, ...props }) => {
  const theme = useTheme();
  const classes = getStoryDeleteModalStyles({ theme });
  const dispatch = useDispatch();
  const { gameId } = useParams();

  const handleDelete = () => {
    dispatch(deleteIssue({ gameId, id: storyId, callback: onClose }));
  };

  return (
    <Modal onClose={onClose} {...props} withCloseIcon sx={classes.modal}>
      <Typography sx={classes.title}>
        Are you sure you want to delete this issue?
      </Typography>
      <Typography sx={classes.subTitle}>
        This operation is irreversible.
      </Typography>
      <Box sx={classes.buttonsBlock}>
        <Button fullWidth variant="text" onClick={onClose}>
          Cancel
        </Button>
        <Button fullWidth sx={classes.delete} onClick={handleDelete}>
          Delete
        </Button>
      </Box>
    </Modal>
  );
};

export default StoryDeleteModal;
