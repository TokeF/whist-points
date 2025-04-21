import { Player } from "@/models/types";
import IPointStrategy, { strategies } from "./IPointStrategy";

const lakseForm = (
  betAmount: number,
  trickAmount: number,
  M: number,
  c: number = 2,
  h: number = 0.5,
  b: number = 1.25,
  N: number = 4
): number => {
  return Math.ceil(
    Math.pow(c, betAmount - 7) * (1 + (trickAmount - betAmount) * h) * b * M * N
  );
};

export const LaksePointStrategy: IPointStrategy = {
  calculatePoints(
    players: Player[],
    selectedPlayers: string[],
    bet: string,
    betAmount: number,
    trickAmount: number
  ): [number, Player[]] {
    let winnerScore = lakseForm(
      betAmount,
      trickAmount,
      strategies.lakse.bets[bet]
    );
    let loserScore = winnerScore;
    if (betAmount > trickAmount) {
      winnerScore *= -1;
    }

    if (selectedPlayers.length === 1) {
      winnerScore *= 3;
      loserScore = Math.ceil(winnerScore / 3);
    }

    return [
      winnerScore,
      players.map((player) => {
        if (selectedPlayers.includes(player.name)) {
          return { ...player, score: player.score + winnerScore };
        } else {
          return { ...player, score: player.score - loserScore };
        }
      }),
    ];
  },
};
