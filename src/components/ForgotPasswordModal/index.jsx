import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, Formik } from "formik";
import { Box, Typography, useTheme } from "@mui/material";

import { resetPassword } from "features/auth/authSlice";
import Modal from "common/Modal";
import Input from "common/Input";
import Button, { LoadingButton } from "common/Button";

import getStyles from "./styles";

const initialValues = {
  email: "",
};

const ForgotPasswordModal = ({
  handleCloseModal: closeModal,
  signUp,
  signIn,
  ...props
}) => {
  const [recoveryLinkSent, setRecoveryLinkSent] = useState(false);
  const [currentEmail, setCurrentEmail] = useState("");
  const theme = useTheme();
  const classes = getStyles({ theme });
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    closeModal();
    setRecoveryLinkSent(false);
    setCurrentEmail("");
  };

  const onSubmit = (data) => {
    const { email } = data;
    setCurrentEmail(email);
    dispatch(resetPassword({ email, callback: setRecoveryLinkSent }));
  };

  return (
    <Modal onClose={handleCloseModal} {...props} withCloseIcon>
      <Typography sx={classes.title} variant="h6">
        Forgot password
      </Typography>
      {!recoveryLinkSent ? (
        <Box>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={onSubmit}
          >
            {({ handleSubmit }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <Box>
                    <Box>
                      <Field name="email">
                        {(props) => {
                          return (
                            <Input
                              label="Email"
                              sx={classes.field}
                              {...props}
                            />
                          );
                        }}
                      </Field>
                    </Box>
                    <LoadingButton
                      loading={auth.isLoading}
                      sx={classes.button}
                      type="submit"
                    >
                      Send recovery link
                    </LoadingButton>
                  </Box>
                </form>
              );
            }}
          </Formik>
          <Box sx={classes.signUpSignIn}>
            <Button variant="text" onClick={signUp}>
              Create account
            </Button>
            <Button variant="text" onClick={signIn}>
              Login
            </Button>
          </Box>
        </Box>
      ) : (
        <Box sx={classes.passwordSent}>
          <Typography>
            We have sent an email to <b>{currentEmail}</b>.
          </Typography>
          <Typography>Check your inbox and follow the instructions.</Typography>
        </Box>
      )}
    </Modal>
  );
};

export default ForgotPasswordModal;
