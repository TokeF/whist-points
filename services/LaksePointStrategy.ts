import { Player } from "@/models/types";
import IPointStrategy from "./IPointStrategy";

export const LaksePointStrategy: IPointStrategy = {
  calculatePoints: function (
    players: Player[],
    selectedPlayers: string[]
  ): [number, Player[]] {
    throw new Error("Function not implemented.");
  },
};
