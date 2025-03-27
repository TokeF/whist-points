import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GameState {
  playerNames: string[];
}

const initialState: GameState = {
  playerNames: [],
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setPlayerNames(state, action: PayloadAction<string[]>) {
      state.playerNames = action.payload;
    },
    addPlayerName(state, action: PayloadAction<string>) {
      state.playerNames.push(action.payload);
    },
    removePlayerName(state, action: PayloadAction<number>) {
      state.playerNames.splice(action.payload, 1);
    },
  },
});

export const { setPlayerNames, addPlayerName, removePlayerName } =
  gameSlice.actions;
export default gameSlice.reducer;
