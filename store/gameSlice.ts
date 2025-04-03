import { HistoryLog, Player } from "@/models/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GameState {
  players: Player[];
  strategy: string;
  trickHistory: HistoryLog[];
  startDate: string | null;
  id: string;
}

const initialState: GameState = {
  players: [],
  strategy: "",
  trickHistory: [],
  startDate: null,
  id: "",
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
    setTrickHistory(state, action: PayloadAction<HistoryLog[]>) {
      state.trickHistory = action.payload;
    },
    setStartDate(state, action: PayloadAction<string | null>) {
      state.startDate = action.payload; // Reducer to set startDate
    },
    setId(state, action: PayloadAction<string>) {
      state.id = action.payload; // Reducer to set the game name
    },
    resetGame(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setPlayers,
  addPlayer,
  removePlayer,
  updatePlayerName,
  setStrategy,
  setTrickHistory,
  setStartDate,
  setId,
  resetGame,
} = gameSlice.actions;
export default gameSlice.reducer;
