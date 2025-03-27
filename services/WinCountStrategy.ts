import IPointStrategy from "./IPointStrategy";
import { Player } from "@/models/types";

export const WinCountStrategy: IPointStrategy = {
  calculatePoints(players: Player[], selectedPlayers: string[]): Player[] {
    let amount = 1;
    if (selectedPlayers.length === 1) {
      amount = 2;
    }

    return players.map((player) => {
      if (selectedPlayers.includes(player.name)) {
        return { ...player, score: player.score + amount };
      } else {
        return { ...player, score: player.score - amount };
      }
    });
  },
};
