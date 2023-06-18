import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  deleteDoc,
  runTransaction,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { auth, db } from "configs/firebase";
import { saveGameId, setAdmin } from "utils/localStorage";
import { COUNTING, DISCUSSING, FINISHED_COUNTING } from "constants/gameState";

export const createGame = createAsyncThunk(
  "game/createGame",
  async ({ dataSet, navigate }) => {
    try {
      const newGameDocRef = await addDoc(collection(db, "game"), dataSet);
      saveGameId(newGameDocRef.id);
      setAdmin();
      navigate(`/${newGameDocRef.id}`);
      return;
    } catch (error) {
      console.error("Failed creating game: " + error);
      return;
    }
  }
);

export const updateGame = createAsyncThunk(
  "game/updateGame",
  async ({ gameId, data, callback }) => {
    const gameDocRef = doc(db, `game/${gameId}`);
    try {
      await updateDoc(gameDocRef, {
        ...data,
      });
      callback && callback();
    } catch (error) {
      console.error("Failed updating game: " + error);
      return;
    }
  }
);

export const addIssue = createAsyncThunk(
  "game/addIssue",
  async ({ title, isVoting, points, gameId, order }) => {
    try {
      await addDoc(collection(db, `game/${gameId}/stories`), {
        title,
        isVoting,
        points,
        pinned: false,
        timestamp: serverTimestamp(),
        order,
        link: "",
        description: "",
      });
      return;
    } catch (error) {
      console.error("Failed adding issue: " + error);
      return;
    }
  }
);

export const deleteIssue = createAsyncThunk(
  "game/deleteIssue",
  async ({ id, gameId, callback }) => {
    try {
      await deleteDoc(doc(db, `game/${gameId}/stories/${id}`));
      callback && callback();
      return;
    } catch (error) {
      console.error("Failed deleting issue: " + error);
      return;
    }
  }
);

export const pinIssue = createAsyncThunk(
  "game/pinIssue",
  ({ gameId, id, pinned }) => {
    const issueDocRef = doc(db, `game/${gameId}/stories/${id}`);
    try {
      updateDoc(issueDocRef, {
        pinned: pinned,
      });
    } catch (error) {
      console.error("Failed pinning issue: " + error);
      return;
    }
  }
);

export const updateIssue = createAsyncThunk(
  "game/updateIssue",
  async ({ gameId, id, data, callback }) => {
    const issueDocRef = doc(db, `game/${gameId}/stories/${id}`);
    try {
      await updateDoc(issueDocRef, {
        ...data,
      });
      callback && callback();
    } catch (error) {
      console.error("Failed updating issue: " + error);
      return;
    }
  }
);

export const chooseCard = createAsyncThunk(
  "game/chooseCard",
  async ({ card, gameId }) => {
    const playerDocRef = doc(
      db,
      `game/${gameId}/players/${auth.currentUser.uid}`
    );
    try {
      return updateDoc(playerDocRef, {
        cardChosen: card,
      });
    } catch (error) {
      console.error("Failed choosing card: " + error);
      return;
    }
  }
);

export const setVotingIssue = createAsyncThunk(
  "game/setVotingIssue",
  async ({ id, gameId }) => {
    const storiesCollectionRef = collection(db, `game/${gameId}/stories`);
    try {
      await runTransaction(db, async (transaction) => {
        const q = query(storiesCollectionRef, where("isVoting", "==", true));
        const queriedStoriesRef = await getDocs(q);

        if (!queriedStoriesRef.empty) {
          let storyDocRefId = [];

          queriedStoriesRef.forEach((story) => {
            storyDocRefId.push(story.id);
          });

          if (storyDocRefId[0] === id) {
            transaction.update(
              doc(db, `game/${gameId}/stories/${storyDocRefId[0]}`),
              {
                isVoting: false,
              }
            );
          } else {
            transaction.update(
              doc(db, `game/${gameId}/stories/${storyDocRefId[0]}`),
              {
                isVoting: false,
              }
            );
            transaction.update(doc(db, `game/${gameId}/stories/${id}`), {
              isVoting: true,
            });
          }
        } else {
          transaction.update(doc(db, `game/${gameId}/stories/${id}`), {
            isVoting: true,
          });
        }
      });
      return;
    } catch (error) {
      console.error("Failed setting voting issue: " + error);
      return;
    }
  }
);

export const setGameStateToDiscussing = createAsyncThunk(
  "game/setGameStateToDiscussing",
  async ({ gameId, callback }) => {
    const gameDocRef = doc(db, `game/${gameId}`);
    const playersCollectionRef = collection(db, `game/${gameId}/players`);
    const storiesCollectionRef = collection(db, `game/${gameId}/stories`);
    try {
      //  NOTE: reset players' cards
      await runTransaction(db, async (transaction) => {
        const q = query(playersCollectionRef, where("cardChosen", "!=", null));
        const queriedPlayersRef = await getDocs(q);
        if (!queriedPlayersRef.empty) {
          queriedPlayersRef.forEach(async (player) => {
            const playerDocRef = doc(db, `game/${gameId}/players/${player.id}`);
            transaction.update(playerDocRef, {
              cardChosen: null,
            });
          });
        }
      });

      //  NOTE: reset votings
      await runTransaction(db, async (transaction) => {
        const q = query(storiesCollectionRef, where("isVoting", "==", true));
        const queriedStoriesRef = await getDocs(q);
        if (!queriedStoriesRef.empty) {
          queriedStoriesRef.forEach(async (story) => {
            const storyDocRef = doc(db, `game/${gameId}/stories/${story.id}`);
            transaction.update(storyDocRef, {
              isVoting: false,
            });
          });
        }
      });

      //  NOTE: reinitialise game state
      await updateDoc(gameDocRef, {
        state: DISCUSSING,
      });
      callback();
    } catch (error) {
      callback();
      console.error("Failed setting game state: " + error);
      return;
    }
  }
);

export const setGameStateToCounting = createAsyncThunk(
  "game/setGameStateToCounting",
  ({ gameId }) => {
    const gameDocRef = doc(db, `game/${gameId}`);
    try {
      updateDoc(gameDocRef, {
        state: COUNTING,
      });
    } catch (error) {
      console.error("Failed setting game state: " + error);
      return;
    }
  }
);

export const setGameStateToFinishedCounting = createAsyncThunk(
  "game/setGameStateToFinishedCounting",
  ({ gameId }) => {
    const gameDocRef = doc(db, `game/${gameId}`);
    try {
      updateDoc(gameDocRef, {
        state: FINISHED_COUNTING,
      });
    } catch (error) {
      console.error("Failed setting game state: " + error);
      return;
    }
  }
);

export const setIssuePoints = createAsyncThunk(
  "game/setIssuePoints",
  ({ issueId, issuePoints, gameId }) => {
    const issueDocRef = doc(db, `game/${gameId}/stories/${issueId}`);
    try {
      updateDoc(issueDocRef, {
        points: issuePoints,
      });
    } catch (error) {
      console.error("Failed setting issue points: " + error);
      return;
    }
  }
);

const gameSlice = createSlice({
  name: "game",
  initialState: {
    currentGame: {},
    isLoading: false,
    isLoadingIssue: false,
    orderedStories: [],
    stories: {
      unpinned: {},
      pinnedToTop: {},
      pinnedToBottom: {},
    },
    players: [],
  },
  reducers: {
    setCurrentGame: (state, action) => {
      state.currentGame = action.payload;
      console.log("Current game state: ", state.currentGame);
    },
    setStories: (state, action) => {
      state.stories = action.payload;
      console.log("Current stories: ", state.stories);
    },
    setOrderedStories: (state, action) => {
      state.orderedStories = action.payload;
      console.log("Current orderedStories: ", state.orderedStories);
    },
    setPlayers: (state, action) => {
      state.players = action.payload;
      console.log("Current players: ", state.players);
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createGame.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createGame.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updateGame.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateGame.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updateGame.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(addIssue.pending, (state, action) => {
      state.isLoadingIssue = true;
    });
    builder.addCase(addIssue.fulfilled, (state, action) => {
      state.isLoadingIssue = false;
    });
    builder.addCase(deleteIssue.pending, (state, action) => {
      state.isLoadingIssue = true;
    });
    builder.addCase(deleteIssue.fulfilled, (state, action) => {
      state.isLoadingIssue = false;
    });
    builder.addCase(pinIssue.pending, (state, action) => {
      state.isLoadingIssue = true;
    });
    builder.addCase(pinIssue.fulfilled, (state, action) => {
      state.isLoadingIssue = false;
    });
    builder.addCase(updateIssue.pending, (state, action) => {
      state.isLoadingIssue = true;
    });
    builder.addCase(updateIssue.fulfilled, (state, action) => {
      state.isLoadingIssue = false;
    });
    builder.addCase(setVotingIssue.pending, (state, action) => {
      state.isLoadingIssue = true;
    });
    builder.addCase(setVotingIssue.fulfilled, (state, action) => {
      state.isLoadingIssue = false;
    });
  },
});

export const {
  setCurrentGame,
  setStories,
  setOrderedStories,
  setPlayers,
  setLoading,
} = gameSlice.actions;

export default gameSlice.reducer;
