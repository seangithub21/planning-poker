import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Field, Formik } from "formik";
import { Box, FormControlLabel, Typography } from "@mui/material";

import { signInAnonymously } from "features/auth/authSlice";
import Modal from "common/Modal";
import Input from "common/Input";
import Switch from "common/Switch";
import Button, { LoadingButton } from "common/Button";

import getStyles from "./styles";

const initialValues = { displayName: "" };

const DisplayNameModal = ({
  children,
  handleCloseModal,
  signIn,
  signUp,
  ...props
}) => {
  const [spectatorMode, setSpectatorMode] = useState(false);
  const classes = getStyles();
  const { gameId } = useParams();
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(
      signInAnonymously({
        displayName: data.displayName,
        callback: handleCloseModal,
        gameId,
        spectatorMode,
      })
    );
  };

  return (
    <Modal {...props} sx={{ width: "60rem" }}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Typography sx={classes.title} variant="h6">
                Choose your display name
              </Typography>
              <Box>
                <Box>
                  <Field name="displayName">
                    {(props) => {
                      return (
                        <Input
                          disabled={auth.isLoading}
                          label="Your display name"
                          sx={classes.field}
                          {...props}
                        />
                      );
                    }}
                  </Field>
                </Box>
                <Box sx={classes.switch}>
                  <FormControlLabel
                    control={
                      <Switch
                        value={spectatorMode}
                        onChange={() => setSpectatorMode(!spectatorMode)}
                      />
                    }
                    label="Join as spectator"
                  />
                </Box>
                <LoadingButton
                  loading={auth.isLoading}
                  sx={classes.button}
                  type="submit"
                >
                  Continue to game
                </LoadingButton>
                <Box sx={classes.buttonsWrapper}>
                  <Button variant="text" onClick={signIn}>
                    Login
                  </Button>
                  <Button variant="text" onClick={signUp}>
                    Sign Up
                  </Button>
                </Box>
              </Box>
            </form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default DisplayNameModal;
