import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Field, Formik } from "formik";
import { Alert, Box, Typography } from "@mui/material";

import { signIn } from "features/auth/authSlice";
import Modal from "common/Modal";
import Input from "common/Input";
import Button, { LoadingButton } from "common/Button";

import getStyles from "./styles";

const initialValues = {
  email: "",
  password: "",
};

const SignInModal = ({
  handleCloseModal,
  signUp,
  forgotPassword,
  ...props
}) => {
  const classes = getStyles();
  const [error, setError] = useState("");
  const { gameId } = useParams();
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  //  NOTE: email@mail.com/passwordTest
  const onSubmit = (data) => {
    const { email, password } = data;
    dispatch(
      signIn({
        email,
        password,
        callback: handleCloseModal,
        setError,
        gameId,
      })
    );
  };

  return (
    <Modal onClose={handleCloseModal} {...props} withCloseIcon>
      <Box>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={onSubmit}
        >
          {({ handleSubmit }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Typography sx={classes.title} variant="h6">
                  Sign in
                </Typography>
                <Box>
                  <Box>
                    <Field name="email">
                      {(props) => {
                        return (
                          <Input
                            label="Email"
                            sx={classes.field}
                            disabled={auth.isLoading}
                            {...props}
                          />
                        );
                      }}
                    </Field>
                  </Box>
                  <Box>
                    <Field name="password">
                      {(props) => {
                        return (
                          <Input
                            label="Password"
                            sx={classes.field}
                            disabled={auth.isLoading}
                            {...props}
                          />
                        );
                      }}
                    </Field>
                  </Box>
                  {error && (
                    <Alert sx={classes.alert} severity="error">
                      {error}
                    </Alert>
                  )}
                  <LoadingButton
                    loading={auth.isLoading}
                    sx={classes.button}
                    type="submit"
                  >
                    Login
                  </LoadingButton>
                </Box>
              </form>
            );
          }}
        </Formik>
        <Box sx={classes.forgotPassword}>
          <Button variant="text" onClick={signUp}>
            Create account
          </Button>
          <Button variant="text" onClick={forgotPassword}>
            Forgot?
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SignInModal;
