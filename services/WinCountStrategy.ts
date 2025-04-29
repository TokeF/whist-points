import IPointStrategy, { strategies } from "./IPointStrategy";
import { Player } from "@/models/types";

export const WinCountStrategy: IPointStrategy = {
  calculatePoints(
    players: Player[],
    selectedPlayers: string[],
    bet: string,
    betAmount: number,
    trickAmount: number,
    hardBetWinners: string[]
  ): [number, Player[]] {
    if (bet in strategies.winCount.hardBets) {
      return [
        hardBetWinners.length > 0 ? 1 : -1,
        players.map((player) => {
          if (
            hardBetWinners.includes(player.name) &&
            selectedPlayers.includes(player.name)
          ) {
            return { ...player, score: player.score + 1 };
          }
          if (selectedPlayers.includes(player.name)) {
            return { ...player, score: player.score - 1 };
          } else {
            return { ...player, score: player.score };
          }
        }),
      ];
    } else {
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
            return { ...player, score: player.score };
          }
        }),
      ];
    }
  },
};
