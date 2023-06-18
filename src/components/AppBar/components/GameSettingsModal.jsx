import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Field, Formik } from "formik";
import {
  Box,
  Chip,
  MenuItem,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

import { updateGame } from "features/game/gameSlice";
import votingSystem from "pages/CreateGamePage/votingSystem";
import Modal from "common/Modal";
import { LoadingButton } from "common/Button";
import Input from "common/Input";
import { MuiSelect } from "common/Select";

import { getGameSettingsModalStyles } from "../styles";

const GameSettingsModal = ({ handleCloseModal, ...props }) => {
  const theme = useTheme();
  const classes = getGameSettingsModalStyles({ theme });
  const { gameId } = useParams();
  const { game, auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const playersOptions = useMemo(() => {
    return [
      ...(!!game.players?.length ? game.players : []),
      !!Object.keys(auth.user).length && auth.user,
    ];
  }, [auth.user, game.players]);

  const handleRenderValue = (playersIds) => {
    return (
      <Stack direction="row" flexWrap="wrap" sx={classes.selectContainer}>
        {playersIds.map((playerId) => {
          const isMe = playerId === auth.user?.uid;
          const currentPlayer =
            !!playersOptions?.length &&
            playersOptions.find((player) => player.uid === playerId);
          const name = isMe
            ? !!currentPlayer.displayName
              ? `${currentPlayer.displayName} (me)`
              : `${currentPlayer.email} (me)`
            : currentPlayer?.displayName || currentPlayer?.email;
          return (
            <Chip
              key={playerId}
              label={name || "All players"}
              sx={classes.selectValue}
            />
          );
        })}
      </Stack>
    );
  };

  const handleSelect = (event, field, form) => {
    const {
      target: { value },
    } = event;
    const areAllPlayers = value.some((player) => player === "allPlayers");
    const selected = areAllPlayers ? ["allPlayers"] : value;
    form.setFieldValue(field.name, selected);
  };

  const onSubmit = (data) => {
    dispatch(updateGame({ gameId, data, callback: handleCloseModal }));
  };

  return (
    <Modal onClose={handleCloseModal} {...props} sx={{ width: "84.8rem" }}>
      <Formik
        enableReinitialize
        initialValues={{
          //  NOTE: facilitator field should sunscribe to game.currentGame.facilitator in the future
          facilitator: auth.user?.uid || "",
          name: game.currentGame?.name || "",
          votingSystem: game.currentGame?.votingSystem || "",
          cardsRevealBy: game.currentGame?.cardsRevealBy || [],
          issueManageBy: game.currentGame?.issueManageBy || [],
        }}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Typography sx={classes.title}>Game settings</Typography>
              <Field name="facilitator">
                {({ form, field }) => (
                  <Input
                    form={form}
                    field={field}
                    select
                    label="Game facilitator"
                    fullWidth
                    disabled
                    sx={classes.field}
                  >
                    {playersOptions.map((player) => (
                      <MenuItem
                        key={player.uid}
                        value={player.uid}
                        sx={classes.menuItemText}
                      >
                        {player.displayName || player.email}{" "}
                        {player.uid === auth.user?.uid && "(You)"}
                      </MenuItem>
                    ))}
                  </Input>
                )}
              </Field>
              <Field name="name">
                {({ form, field }) => (
                  <Input
                    label="Game's name"
                    form={form}
                    field={field}
                    fullWidth
                    sx={classes.field}
                  />
                )}
              </Field>
              <Field name="votingSystem">
                {({ form, field }) => (
                  <Input
                    label="Voting system"
                    form={form}
                    field={field}
                    fullWidth
                    select
                    sx={classes.field}
                  >
                    {votingSystem.map((system) => (
                      <MenuItem
                        key={system.value}
                        value={system.value}
                        sx={classes.menuItemText}
                      >
                        {system.label}
                      </MenuItem>
                    ))}
                  </Input>
                )}
              </Field>
              <Field name="cardsRevealBy">
                {({ form, field }) => (
                  <MuiSelect
                    form={form}
                    field={field}
                    multiple
                    renderValue={handleRenderValue}
                    label="Who can reveal cards"
                    fullWidth
                    sx={classes.field}
                    onChange={handleSelect}
                  >
                    <MenuItem
                      value="allPlayers"
                      sx={classes.menuItemText}
                      disableRipple
                    >
                      All players
                    </MenuItem>
                    {playersOptions.map((player) => (
                      <MenuItem
                        key={player.uid}
                        value={player.uid}
                        sx={classes.menuItemText}
                        disableRipple
                      >
                        <Box sx={classes.avatar}>
                          {(player.displayName ||
                            player.email)?.[0].toUpperCase()}
                        </Box>
                        {player.displayName || player.email}{" "}
                        {player.uid === auth.user?.uid && "(Me)"}
                      </MenuItem>
                    ))}
                  </MuiSelect>
                )}
              </Field>
              <Field name="issueManageBy">
                {({ form, field }) => (
                  <MuiSelect
                    form={form}
                    field={field}
                    multiple
                    renderValue={handleRenderValue}
                    label="Who can manage issues"
                    fullWidth
                    sx={classes.field}
                    onChange={handleSelect}
                  >
                    <MenuItem
                      value="allPlayers"
                      sx={classes.menuItemText}
                      disableRipple
                    >
                      All players
                    </MenuItem>
                    {playersOptions.map((player) => (
                      <MenuItem
                        key={player.uid}
                        value={player.uid}
                        sx={classes.menuItemText}
                        disableRipple
                      >
                        <Box sx={classes.avatar}>
                          {(player.displayName ||
                            player.email)?.[0].toUpperCase()}
                        </Box>
                        {player.displayName || player.email}{" "}
                        {player.uid === auth.user?.uid && "(Me)"}
                      </MenuItem>
                    ))}
                  </MuiSelect>
                )}
              </Field>
              <LoadingButton
                loading={game.isLoading}
                type="submit"
                fullWidth
                sx={classes.button}
              >
                Update game settings
              </LoadingButton>
            </form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default GameSettingsModal;
