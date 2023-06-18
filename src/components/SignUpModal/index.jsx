import { Box, Typography } from "@mui/material";
import { Field, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import { signUp } from "features/auth/authSlice";
import Modal from "common/Modal";
import Input from "common/Input";
import Button, { LoadingButton } from "common/Button";

import getStyles from "./styles";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .min(6, "Password should be at least 6 characters"),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Does not match")
    .required(),
});

const initialValues = {
  email: "",
  password: "",
  repeatPassword: "",
  displayName: "",
};

const SignUpModal = ({ handleCloseModal, signIn, ...props }) => {
  const classes = getStyles();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const onSubmit = (data) => {
    const dataSet = {
      email: data.email,
      password: data.password,
    };
    const callback = handleCloseModal;
    dispatch(signUp({ ...dataSet, callback }));
  };

  return (
    <Modal onClose={handleCloseModal} {...props} withCloseIcon>
      <Box>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={schema}
        >
          {({ errors, handleSubmit }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Typography sx={classes.title} variant="h6">
                  Sign up
                </Typography>
                <Box>
                  <Box>
                    <Field name="email">
                      {(props) => {
                        return (
                          <Input
                            label="Email"
                            sx={classes.field}
                            helperText={errors.email}
                            error={!!errors.email}
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
                            helperText={errors.password}
                            error={!!errors.password}
                            {...props}
                          />
                        );
                      }}
                    </Field>
                  </Box>
                  <Box>
                    <Field name="repeatPassword">
                      {(props) => {
                        return (
                          <Input
                            label="Repeat password"
                            sx={classes.field}
                            helperText={errors.repeatPassword}
                            error={!!errors.repeatPassword}
                            {...props}
                          />
                        );
                      }}
                    </Field>
                  </Box>
                  <Box>
                    <Field name="displayName">
                      {(props) => {
                        return (
                          <Input
                            label="Your display name"
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
                    Sign up
                  </LoadingButton>
                </Box>
              </form>
            );
          }}
        </Formik>
        <Box sx={classes.login}>
          <Typography sx={{ fontSize: "1.5rem", color: "text.secondary" }}>
            Already have an account?
          </Typography>
          <Button variant="text" onClick={signIn}>
            Login
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SignUpModal;
