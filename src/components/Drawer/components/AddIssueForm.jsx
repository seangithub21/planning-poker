import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Field, Formik } from "formik";
import { Box } from "@mui/material";
import ClickAwayListener from "@mui/base/ClickAwayListener";

import { addIssue } from "features/game/gameSlice";
import { assignOrder, isStoriesListEmpty } from "utils/stories";
import Input from "common/Input";
import Button from "common/Button";

const initialValues = { title: "", id: "", isVoting: false };

const AddIssueForm = ({ handleCloseIssueForm }) => {
  const { gameId } = useParams();
  const game = useSelector((state) => state.game);
  const dispatch = useDispatch();

  const handleSubmit = (data) => {
    const isVoting = isStoriesListEmpty(game.stories);
    const order = assignOrder(game.orderedStories);
    dispatch(
      addIssue({ title: data.title, isVoting, points: 0, gameId, order })
    );
    handleCloseIssueForm();
  };

  return (
    <ClickAwayListener onClickAway={handleCloseIssueForm}>
      <Box>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {({ errors, handleSubmit }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Box>
                  <Box sx={{ mb: "1.5rem" }}>
                    <Field name="title">
                      {(props) => {
                        return (
                          <Input
                            multiline
                            minRows={3}
                            fullWidth
                            sx={{
                              backgroundColor: "#f1f1f1",
                              borderRadius: ".8rem",
                              "& fieldset": {
                                border: "none",
                              },
                            }}
                            placeholder="Enter a title for the issue"
                            {...props}
                          />
                        );
                      }}
                    </Field>
                  </Box>
                  <Box sx={{ display: "flex", gap: "1.5rem" }}>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={handleCloseIssueForm}
                    >
                      Cancel
                    </Button>
                    <Button fullWidth type="submit">
                      Save
                    </Button>
                  </Box>
                </Box>
              </form>
            );
          }}
        </Formik>
      </Box>
    </ClickAwayListener>
  );
};

export default AddIssueForm;
