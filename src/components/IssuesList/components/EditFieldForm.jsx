import { Field, Formik } from "formik";
import { Box, useTheme } from "@mui/material";
import ClickAwayListener from "@mui/base/ClickAwayListener";

import Input from "common/Input";
import Button from "common/Button";

import { getEditFieldFormStyles } from "../styles";

const EditFieldForm = ({
  initialValues,
  fieldName,
  isMultiline,
  minRows,
  handleCloseForm,
  isFullWidth,
  handleSubmitOutsideOfForm,
  inputProps: { style } = {},
}) => {
  const theme = useTheme();
  const classes = getEditFieldFormStyles({ theme });

  const handleSubmit = (data) => {
    handleSubmitOutsideOfForm(fieldName, data);
  };

  return (
    <ClickAwayListener onClickAway={handleCloseForm}>
      <Box>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Box>
                <Box>
                  <Field name={fieldName}>
                    {({ field, form }) => (
                      <Input
                        multiline={isMultiline}
                        minRows={minRows}
                        field={field}
                        form={form}
                        fullWidth={isFullWidth}
                        inputProps={{
                          style: {
                            fontFamily: "UbuntuRegular",
                            padding: "1.6rem",
                            ...style,
                          },
                        }}
                      />
                    )}
                  </Field>
                </Box>
                <Box sx={classes.buttonsContainer}>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={handleCloseForm}
                  >
                    Cancel
                  </Button>
                  <Button fullWidth type="submit">
                    Save
                  </Button>
                </Box>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </ClickAwayListener>
  );
};

export default EditFieldForm;
