import { configureStore } from "@reduxjs/toolkit";

import gameReducer from "features/game/gameSlice";
import authReducer from "features/auth/authSlice";

const store = configureStore({
  reducer: {
    game: gameReducer,
    auth: authReducer,
  },
});

export default store;
