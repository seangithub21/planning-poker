import { Box, Typography } from "@mui/material";
import { Field, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { createGame } from "features/game/gameSlice";
import votingSystem from "./votingSystem";
import { DISCUSSING } from "constants/gameState";
import { LoadingButton } from "common/Button";
import Input from "common/Input";
import { FormSelect } from "common/Select";

import getStyles from "./styles";

const initialValues = { gameName: "", votingSystem: "" };

const CreateGamePage = () => {
  const classes = getStyles();
  const navigate = useNavigate();
  const game = useSelector((state) => state.game);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const dataSet = {
      name: data.gameName,
      votingSystem: data.votingSystem.value,
      state: DISCUSSING,
      facilitator: "",
      cardsRevealBy: ["allPlayers"],
      issueManageBy: ["allPlayers"],
    };
    dispatch(createGame({ dataSet, navigate }));
  };

  return (
    <Box sx={classes.container}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({ errors, touched, handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit} style={classes.form}>
              <Typography sx={classes.title}>
                Choose a name and a voting system for your game.
              </Typography>
              <Box>
                <Field name="gameName">
                  {(props) => {
                    return (
                      <Input label="Game name" sx={classes.field} {...props} />
                    );
                  }}
                </Field>
              </Box>
              <Box>
                <Field name="votingSystem">
                  {(props) => {
                    return (
                      //  NOTE: consider using custom Input component
                      //        with select prop for simplicity in future
                      <FormSelect
                        sx={classes.field}
                        options={votingSystem}
                        label="Voting system"
                        {...props}
                      />
                    );
                  }}
                </Field>
              </Box>
              <Box>
                <LoadingButton
                  loading={game.isLoading}
                  type="submit"
                  sx={classes.button}
                >
                  Create game
                </LoadingButton>
              </Box>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default CreateGamePage;
