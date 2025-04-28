import { Player } from "@/models/types";
import IPointStrategy, { strategies } from "./IPointStrategy";

const scoreFunctionRegular = (
  bet: string,
  betAmount: number,
  trickAmount: number
): number => {
  let nameMultiplier = 1;
  if (bet !== "alm") {
    nameMultiplier = 2;
  }
  // lost bet / negative points are handled later
  return (
    2 * nameMultiplier * Math.pow(2, Math.abs(betAmount - 7)) +
    1 * Math.pow(2, betAmount - 7) * Math.abs(trickAmount - betAmount) // add half of base point for each extra trick, this still reward riskier bets
  );
};

const scoreFunctionHardBet = (bet: string): number => {
  return strategies.classic.hardBets[bet];
};

export const ClassicStrategy: IPointStrategy = {
  calculatePoints(
    players: Player[],
    selectedPlayers: string[],
    bet: string,
    betAmount: number,
    trickAmount: number
  ): [number, Player[]] {
    let score = 0;
    if (bet in strategies.classic.hardBets) {
      score = scoreFunctionHardBet(bet);
    } else {
      score = scoreFunctionRegular(bet, betAmount, trickAmount);
    }

    if (betAmount > trickAmount) {
      score *= -1;
    }
    let opponentScore = -score;

    // selvmakker
    if (selectedPlayers.length === 1) {
      score *= 3;
      opponentScore = score / 3;
    }

    return [
      score,
      players.map((player) => {
        if (selectedPlayers.includes(player.name)) {
          return { ...player, score: player.score + score };
        } else {
          return { ...player, score: player.score + opponentScore };
        }
      }),
    ];
  },
};
