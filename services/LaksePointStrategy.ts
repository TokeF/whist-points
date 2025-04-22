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
  if (betAmount > trickAmount) {
    return Math.ceil(
      Math.pow(c, betAmount - 7) * ((-1 + trickAmount - betAmount) * h) * M * N
    );
  }
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
    console.log("betAmount", betAmount);
    console.log("trickAmount", trickAmount);
    console.log("bettttt", bet);
    console.log("selectedPlayers", selectedPlayers);
    console.log("players", players);

    let winnerScore = -1;
    let loserScore = 0;
    console.log("bet", bet);
    if (bet in strategies.lakse.hardBets) {
      winnerScore = lakseForm(
        strategies.lakse.hardBets[bet],
        trickAmount,
        strategies.lakse.bets[bet]
      );
    } else {
      winnerScore = lakseForm(
        betAmount,
        trickAmount,
        strategies.lakse.bets[bet]
      );
      console.log("winnerScore", winnerScore);
      // if selvmakker
      if (selectedPlayers.length === 1) {
        winnerScore *= 3;
        loserScore = Math.ceil(winnerScore / 3);
      }
    }

    loserScore = winnerScore;

    console.log("win", winnerScore);
    console.log("lose", loserScore);
    return [
      betAmount > trickAmount ? loserScore : winnerScore,
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
