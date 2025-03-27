import { Player } from "@/models/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GameState {
  players: Player[];
  strategy: string;
}

const initialState: GameState = {
  players: [],
  strategy: "",
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setPlayers(state, action: PayloadAction<Player[]>) {
      state.players = action.payload;
    },
    addPlayer(state, action: PayloadAction<Player>) {
      state.players.push(action.payload);
    },
    removePlayer(state, action: PayloadAction<number>) {
      state.players.splice(action.payload, 1);
    },
    updatePlayerName(
      state,
      action: PayloadAction<{ index: number; name: string }>
    ) {
      state.players[action.payload.index].name = action.payload.name;
    },
    setStrategy(state, action: PayloadAction<string>) {
      state.strategy = action.payload;
    },
  },
});

export const {
  setPlayers,
  addPlayer,
  removePlayer,
  updatePlayerName,
  setStrategy,
} = gameSlice.actions;
export default gameSlice.reducer;
