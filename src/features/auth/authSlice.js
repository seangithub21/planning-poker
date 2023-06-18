import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  signInAnonymously as firebaseSignInAnonymously,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  runTransaction,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

import { auth, db } from "configs/firebase";
import { setLoading as setLoadingGame } from "features/game/gameSlice";
import { toastSuccess } from "common/Toastify";

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ email, password, callback }) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        callback && callback();
        toastSuccess("Thank you for signing up!");
        return;
      })
      .catch((error) => {
        callback && callback();
        toast.error("Error");
        return;
      });
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password, callback, setError, gameId }) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        const { currentUser } = auth;
        const newPlayer = {
          accessToken: currentUser.accessToken,
          refreshToken: currentUser.refreshToken,
          displayName: currentUser.displayName,
          email: currentUser.email,
          uid: currentUser.uid,
          isAnonymous: currentUser.isAnonymous,
          cardChosen: null,
          spectatorMode: false,
        };

        if (gameId) {
          return setDoc(
            doc(db, `game/${gameId}/players/${currentUser.uid}`),
            newPlayer
          );
        }
      })
      .then(() => {
        setError("");
        callback && callback();
        toastSuccess("You have successfully signed in!");
        return;
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
        toast.error("Error");
        return;
      });
  }
);

export const signInAnonymously = createAsyncThunk(
  "auth/signInAnonymously",
  async ({ displayName, callback, gameId, spectatorMode }, { dispatch }) => {
    dispatch(setLoadingGame(true));

    firebaseSignInAnonymously(auth)
      .then(() => {
        return updateProfile(auth.currentUser, { displayName });
      })
      .then(() => {
        const {
          accessToken,
          refreshToken,
          displayName,
          email,
          uid,
          isAnonymous,
        } = auth.currentUser;
        const newPlayer = {
          accessToken,
          refreshToken,
          displayName,
          email,
          uid,
          isAnonymous,
          cardChosen: null,
          spectatorMode,
        };

        return setDoc(doc(db, `game/${gameId}/players/${uid}`), newPlayer);
      })
      .then(() => {
        dispatch(setLoadingGame(false));
        callback();
        toastSuccess("You have successfully signed in anonymously!");
        window.location.reload();
        return;
      })
      .catch((error) => {
        dispatch(setLoadingGame(false));
        toast.error("Error");
        return;
      });
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ email, callback }) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        callback && callback(true);
      })
      .catch((error) => {
        toast.error("Error");
        return;
      });
  }
);

export const addUserToPlayersCollection = createAsyncThunk(
  "auth/addUserToPlayersCollection",
  async ({ gameId, userData }) => {
    return getDoc(doc(db, `game/${gameId}/players/${userData.uid}`))
      .then((userAsPlayerDocRef) => {
        if (!userAsPlayerDocRef.exists())
          return setDoc(
            doc(db, `game/${gameId}/players/${userData.uid}`),
            userData
          );
        return;
      })
      .catch((error) => {
        toast.error("Error");
        return;
      });
  }
);

export const toggleSpectatorMode = createAsyncThunk(
  "auth/toggleSpectatorMode",
  async ({ gameId, userData, data }) => {
    const userDocRef = doc(db, `game/${gameId}/players/${userData.uid}`);
    return updateDoc(userDocRef, data).catch((error) => {
      toast.error("Error");
      return;
    });
  }
);

export const signOut = createAsyncThunk(
  "auth/signOut",
  async ({ callback, gameId } = {}) => {
    const playersCollectionRef = collection(db, `game/${gameId}/players`);
    const storiesCollectionRef = collection(db, `game/${gameId}/stories`);
    const gameDocRef = doc(db, `game/${gameId}`);
    return (
      runTransaction(db, async (transaction) => {
        return (
          //  NOTE: first delete nested players collection
          getDocs(playersCollectionRef)
            .then((players) => {
              players.forEach((player) => {
                transaction.delete(
                  doc(db, `game/${gameId}/players/${player.id}`)
                );
              });
            })
            //  NOTE: second delete nested stories collection
            .then(async () => {
              return getDocs(storiesCollectionRef).then((stories) => {
                stories.forEach((story) => {
                  transaction.delete(
                    doc(db, `game/${gameId}/stories/${story.id}`)
                  );
                });
              });
            })
            //  NOTE: third delete game itself
            .then(() => {
              transaction.delete(gameDocRef);
            })
            .catch((error) => {
              toast.error("Error");
              return;
            })
        );
      })
        //  NOTE: and finally sign out
        .then(() => {
          callback();
          toastSuccess("You have signed out successfully!");
          return firebaseSignOut(auth);
        })
        .catch((error) => {
          toast.error("Error");
          return;
        })
    );
  }
);

export const signOutAsNonAdmin = createAsyncThunk(
  "auth/signOutAsNonAdmin",
  async ({ gameId } = {}) => {
    const playerDocRef = doc(
      db,
      `game/${gameId}/players/${auth.currentUser.uid}`
    );
    return runTransaction(db, async (transaction) => {
      return transaction
        .get(playerDocRef)
        .then((playerDoc) => {
          if (playerDoc.exists()) {
            return transaction.delete(playerDocRef);
          }
        })
        .then(() => {
          toastSuccess("You have signed out successfully!");
          return firebaseSignOut(auth);
        });
    }).catch((error) => {
      toast.error("Error");
      return;
    });
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: "",
    isLoading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(signIn.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(signInAnonymously.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(signInAnonymously.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(signOut.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(signOut.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(signOut.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(signOutAsNonAdmin.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(signOutAsNonAdmin.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(signOutAsNonAdmin.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(resetPassword.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const { setUser, setLoading } = authSlice.actions;

export default authSlice.reducer;
