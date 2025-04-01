import { Player } from "@/models/types";
import IPointStrategy from "./IPointStrategy";

export const LaksePointStrategy: IPointStrategy = {
  calculatePoints(
    players: Player[],
    selectedPlayers: string[],
    bet: string,
    betAmount: number,
    trickAmount: number
  ): [number, Player[]] {
    let amount = 1;
    if (betAmount > trickAmount) {
      amount *= -1;
    }

    return [
      amount,
      players.map((player) => {
        if (selectedPlayers.includes(player.name)) {
          return { ...player, score: player.score + amount };
        } else {
          return { ...player, score: player.score - amount };
        }
      }),
    ];
  },
};
