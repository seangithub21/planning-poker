import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { Box, Grid, Typography } from "@mui/material";

import { db, auth as firebaseAuth } from "configs/firebase";
import {
  setGameStateToCounting,
  setGameStateToDiscussing,
  setGameStateToFinishedCounting,
  setIssuePoints,
  setPlayers,
} from "features/game/gameSlice";
import { setUser, signOutAsNonAdmin } from "features/auth/authSlice";
import { isAdmin } from "utils/localStorage";
import { DISCUSSING, FINISHED_COUNTING } from "constants/gameState";
import usePointsCounter from "hooks/usePointsCounter";
import PlayerCard from "./components/PlayerCard";
import Button from "common/Button";
import { toastSuccess } from "common/Toastify";

import { getStyles } from "./styles";

const Board = ({ handleOpenInvitePlayersModal }) => {
  const [countDown, setCountDown] = useState(3);
  const [countDownId, setCountDownId] = useState(0);
  const { gameId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth, game } = useSelector((state) => state);
  const { result } = usePointsCounter();

  const borderAnimationOn = useMemo(() => {
    return game.currentGame?.state === DISCUSSING && !!game.players.length
      ? (auth.user?.cardChosen || auth.user?.cardChosen === 0) &&
          game.players.every(
            (player) => player.cardChosen || player.cardChosen === 0
          )
      : (game.currentGame?.state === DISCUSSING && auth.user?.cardChosen) ||
          auth.user?.cardChosen === 0;
  }, [game.currentGame?.state, auth.user?.cardChosen, game.players]);

  const classes = getStyles({ borderAnimationOn });

  const isReadyToRevealCards =
    auth.user?.cardChosen ||
    auth.user?.cardChosen === 0 ||
    (!!game.players.length &&
      game.players.some(
        (player) => player.cardChosen || player.cardChosen === 0
      ));

  const isVotingStoryIdNow =
    Object.keys(game.stories.unpinned).find(
      (storyId) => game.stories.unpinned[storyId].isVoting
    ) ||
    Object.keys(game.stories.pinnedToTop).find(
      (storyId) => game.stories.pinnedToTop[storyId].isVoting
    ) ||
    Object.keys(game.stories.pinnedToBottom).find(
      (storyId) => game.stories.pinnedToBottom[storyId].isVoting
    );

  const canRevealCards = game.currentGame?.cardsRevealBy?.some(
    (playerId) => playerId === auth.user?.uid || playerId === "allPlayers"
  );

  useEffect(() => {
    const playersCollectionRef = collection(db, `game/${gameId}/players`);
    const unsubscribe = onSnapshot(playersCollectionRef, (playersSnapshot) => {
      const updatedPlayers = [];
      playersSnapshot.forEach((playerDoc) => {
        if (playerDoc.data().uid !== firebaseAuth.currentUser.uid) {
          updatedPlayers.push({
            ...playerDoc.data(),
            id: playerDoc.id,
          });
        } else {
          dispatch(setUser({ ...playerDoc.data() }));
        }
      });
      dispatch(setPlayers(updatedPlayers));
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //  NOTE: sign out if a game is deleted by admin
  useEffect(() => {
    if (!isAdmin()) {
      const playerDocRef = doc(db, `game/${gameId}/players/${auth.user.uid}`);
      const unsubscribe = onSnapshot(playerDocRef, (playerDoc) => {
        if (!playerDoc.exists()) {
          navigate("/");
          toastSuccess("Admin finished a game");
          dispatch(signOutAsNonAdmin({ gameId }));
        }
      });

      return () => unsubscribe();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (countDown <= 0) {
      clearInterval(countDownId);
      setCountDownId(0);
      if (isVotingStoryIdNow) {
        dispatch(
          setIssuePoints({
            issueId: isVotingStoryIdNow,
            issuePoints: result,
            gameId,
          })
        );
      }
      dispatch(setGameStateToFinishedCounting({ gameId }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countDown]);

  const displayPlayer = (playerIndex) => {
    return (
      game.players[playerIndex]?.displayName || game.players[playerIndex]?.email
    );
  };

  const displayCardChosen = (playerIndex) => {
    return (
      game.players[playerIndex]?.cardChosen ||
      (game.players[playerIndex]?.cardChosen === 0 && 0)
    );
  };

  const checkIfIsSpectator = (playerIndex) =>
    game.players[playerIndex]?.spectatorMode;

  const handleRevealCards = () => {
    dispatch(setGameStateToCounting({ gameId }));

    const countId = setInterval(() => {
      setCountDown((state) => --state);
    }, 1000);

    setCountDownId(countId);
  };

  const handleStartNewVoting = () => {
    const callback = () => {
      setCountDown(3);
    };

    dispatch(setGameStateToDiscussing({ gameId, callback }));
  };

  return (
    <Box sx={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={4} sx={classes.leftTopPlayersGroup}>
          {game.players[1] && (
            <PlayerCard
              sx={{ mt: "6rem" }}
              cardChosen={displayCardChosen(1)}
              name={displayPlayer(1)}
              isSpectator={checkIfIsSpectator(1)}
            />
          )}
          {game.players[2] && (
            <PlayerCard
              sx={{ marginRight: "-10rem" }}
              cardChosen={displayCardChosen(2)}
              name={displayPlayer(2)}
              isSpectator={checkIfIsSpectator(2)}
            />
          )}
        </Grid>
        <Grid item xs={4}>
          {!!game.players.length ? (
            <PlayerCard
              cardChosen={displayCardChosen(0)}
              name={displayPlayer(0)}
              isSpectator={checkIfIsSpectator(0)}
            />
          ) : (
            <Box>
              <Typography>Feeling lonely? 😴</Typography>
              <Button variant="text" onClick={handleOpenInvitePlayersModal}>
                Invite players
              </Button>
            </Box>
          )}
        </Grid>
        <Grid item xs={4} sx={classes.rightTopPlayersGroup}>
          {game.players[3] && (
            <PlayerCard
              sx={{ marginLeft: "-10rem" }}
              cardChosen={displayCardChosen(3)}
              name={displayPlayer(3)}
              isSpectator={checkIfIsSpectator(3)}
            />
          )}
          {game.players[4] && (
            <PlayerCard
              sx={{ mt: "6rem" }}
              cardChosen={displayCardChosen(4)}
              name={displayPlayer(4)}
              isSpectator={checkIfIsSpectator(4)}
            />
          )}
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <Box sx={classes.boardBorder}>
            <Box sx={classes.board}>
              {isReadyToRevealCards &&
              game.currentGame?.state === DISCUSSING ? (
                canRevealCards ? (
                  <Button onClick={handleRevealCards}>Reveal cards</Button>
                ) : (
                  <Typography sx={classes.votingInProgress}>
                    Voting in progress
                  </Typography>
                )
              ) : game.currentGame?.state === "counting" ? (
                <Typography variant="h6" sx={classes.countDown}>
                  {countDown}
                </Typography>
              ) : game.currentGame?.state === FINISHED_COUNTING ? (
                <Button
                  sx={classes.newVotingButton}
                  onClick={handleStartNewVoting}
                >
                  Start new voting
                </Button>
              ) : (
                <Typography>Pick your cards!</Typography>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={4} sx={classes.leftBottomPlayersGroup}>
          {game.players[5] && (
            <PlayerCard
              cardChosen={displayCardChosen(5)}
              name={displayPlayer(5)}
              isSpectator={checkIfIsSpectator(5)}
            />
          )}
          {game.players[6] && (
            <PlayerCard
              sx={{ marginRight: "-10rem", mt: "6rem" }}
              cardChosen={displayCardChosen(6)}
              name={displayPlayer(6)}
              isSpectator={checkIfIsSpectator(6)}
            />
          )}
        </Grid>
        <Grid item xs={4}>
          <PlayerCard
            cardChosen={
              auth.user?.cardChosen || (auth.user?.cardChosen === 0 && 0)
            }
            name={auth.user?.displayName || auth.user?.email}
            isSpectator={auth.user?.spectatorMode}
          />
        </Grid>
        <Grid item xs={4} sx={classes.rightBottomPlayersGroup}>
          {game.players[7] && (
            <PlayerCard
              sx={{ mt: "6rem", ml: "-10rem" }}
              cardChosen={displayCardChosen(7)}
              name={displayPlayer(7)}
              isSpectator={checkIfIsSpectator(7)}
            />
          )}
          {game.players[8] && (
            <PlayerCard
              cardChosen={displayCardChosen(8)}
              name={displayPlayer(8)}
              isSpectator={checkIfIsSpectator(8)}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Board;
