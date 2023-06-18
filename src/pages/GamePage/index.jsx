import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { Box } from "@mui/material";

import { db } from "configs/firebase";
import {
  setCurrentGame,
  setOrderedStories,
  setStories,
} from "features/game/gameSlice";
import { addUserToPlayersCollection } from "features/auth/authSlice";
import Loading from "common/Loading";
import DisplayNameModal from "components/DisplayNameModal";
import SignUpModal from "components/SignUpModal";
import SignInModal from "components/SignInModal";
import ForgotPasswordModal from "components/ForgotPasswordModal";
import InvitePlayersModal from "components/InvitePlayersModal";
import Footer from "components/Footer";
import Board from "components/Board";

import getStyles from "./styles";

const GamePage = () => {
  const classes = getStyles();
  const [modalOpen, setModalOpen] = useState("");
  const [inviteLink, setInviteLink] = useState("");
  const { gameId } = useParams();
  const dispatch = useDispatch();
  const { auth, game } = useSelector((state) => state);

  useEffect(() => {
    const gameDocRef = doc(db, "game", gameId);
    const unsubscribe = onSnapshot(gameDocRef, (gameSnapshot) => {
      const updatedGame = gameSnapshot.data();
      dispatch(setCurrentGame(updatedGame));
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const storiesCollectionRef = query(
      collection(db, `game/${gameId}/stories`),
      orderBy("timestamp", "asc")
    );
    const unsubscribe = onSnapshot(storiesCollectionRef, (storiesSnapshot) => {
      const updatedStories = {
        unpinned: {},
        pinnedToTop: {},
        pinnedToBottom: {},
      };
      const updatedOrderedStories = [];
      storiesSnapshot.forEach((storyDoc) => {
        const { timestamp, ...rest } = storyDoc.data();
        const convertedDate = timestamp?.toDate().toString();
        const story = { ...rest, id: storyDoc.id, timestamp: convertedDate };
        updatedOrderedStories.push(story);
        if (rest.pinned) {
          if (rest.pinned === "top") {
            updatedStories.pinnedToTop[storyDoc.id] = story;
          } else {
            updatedStories.pinnedToBottom[storyDoc.id] = story;
          }
        } else {
          updatedStories.unpinned[storyDoc.id] = {
            ...rest,
            id: storyDoc.id,
            timestamp: convertedDate,
          };
        }
      });
      updatedOrderedStories.sort(
        (previousStory, nextStory) => previousStory.order - nextStory.order
      );
      dispatch(setStories(updatedStories));
      dispatch(setOrderedStories(updatedOrderedStories));
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (auth.user === "" || auth.user === null) {
      setModalOpen("displayNameModal");
    } else {
      dispatch(addUserToPlayersCollection({ gameId, userData: auth.user }));
      setModalOpen("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user]);

  const handleCloseModal = () => {
    setModalOpen("");
  };

  const handleOpenSignUpModal = () => {
    setModalOpen("signup");
  };

  const handleOpenSignInModal = () => {
    setModalOpen("signin");
  };

  const handleOpenForgotPasswordModal = () => {
    setModalOpen("forgotPassword");
  };

  const handleOpenInvitePlayersModal = () => {
    setModalOpen("invitePlayers");
    const url = window.location.href;
    setInviteLink(url);
  };

  const handleChangeInviteLink = (value) => {
    setInviteLink(value);
  };

  return (
    <Box sx={classes.container}>
      {game.isLoading || !auth.user ? (
        <Loading sx={{ margin: "calc(50vh - 10rem) auto 0" }} />
      ) : (
        <>
          <Board handleOpenInvitePlayersModal={handleOpenInvitePlayersModal} />
          <Footer />
        </>
      )}
      <DisplayNameModal
        open={modalOpen === "displayNameModal"}
        handleCloseModal={handleCloseModal}
        signIn={handleOpenSignInModal}
        signUp={handleOpenSignUpModal}
      />
      <SignUpModal
        open={modalOpen === "signup"}
        handleCloseModal={handleCloseModal}
        signIn={handleOpenSignInModal}
      />
      <SignInModal
        open={modalOpen === "signin"}
        handleCloseModal={handleCloseModal}
        signUp={handleOpenSignUpModal}
        forgotPassword={handleOpenForgotPasswordModal}
      />
      <ForgotPasswordModal
        open={modalOpen === "forgotPassword"}
        handleCloseModal={handleCloseModal}
        signUp={handleOpenSignUpModal}
        signIn={handleOpenSignInModal}
      />
      <InvitePlayersModal
        open={modalOpen === "invitePlayers"}
        handleCloseModal={handleCloseModal}
        inviteLink={inviteLink}
        onChange={handleChangeInviteLink}
      />
    </Box>
  );
};

export default GamePage;
