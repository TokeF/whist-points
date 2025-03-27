import { Player } from "@/models/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GameState {
  players: Player[];
}

const initialState: GameState = {
  players: [],
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
    updatePlayerScore: (
      state,
      action: PayloadAction<{ name: string; points: number }>
    ) => {
      const player = state.players.find((p) => p.name === action.payload.name);
      if (player) {
        player.score += action.payload.points;
      }
    },
  },
});

export const {
  setPlayers,
  addPlayer,
  removePlayer,
  updatePlayerName,
  updatePlayerScore,
} = gameSlice.actions;
export default gameSlice.reducer;
