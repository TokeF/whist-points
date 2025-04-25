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

const calculateHardBet = (
  players: Player[],
  selectedPlayers: string[],
  bet: string,
  hardBetWinners: string[]
): [number, Player[]] => {
  let hardbetWonScore = lakseForm(
    strategies.lakse.hardBets[bet],
    13,
    strategies.lakse.bets[bet]
  );
  let hardbetLostScore = lakseForm(
    strategies.lakse.hardBets[bet],
    0,
    strategies.lakse.bets[bet]
  );

  return [
    hardBetWinners.length > 0 ? hardbetWonScore : hardbetLostScore,
    players.map((player) => {
      if (hardBetWinners.length === 0) {
        if (selectedPlayers.includes(player.name)) {
          return { ...player, score: player.score + hardbetLostScore };
        }
        let zeroSum =
          -1 *
          Math.ceil(
            (hardbetLostScore * selectedPlayers.length) /
              (4 - selectedPlayers.length)
          );
        console.log("zeroSum", zeroSum);
        console.log("hardbetLostScore", hardbetLostScore);
        return { ...player, score: player.score + zeroSum };
      } else {
        if (
          selectedPlayers.includes(player.name) &&
          hardBetWinners.includes(player.name)
        ) {
          return { ...player, score: player.score + hardbetWonScore };
        }
        let zeroSum = Math.ceil(
          (hardbetWonScore * hardBetWinners.length) /
            (4 - hardBetWinners.length)
        );
        console.log("zeroSum", zeroSum);
        console.log("hardbetWonScore", hardbetWonScore);
        return { ...player, score: player.score - zeroSum };
      }
    }),
  ];
};

const calculateRegularBet = (
  players: Player[],
  selectedPlayers: string[],
  bet: string,
  betAmount: number,
  trickAmount: number
): [number, Player[]] => {
  let winnerScore = -1;
  let loserScore = 0;

  winnerScore = lakseForm(betAmount, trickAmount, strategies.lakse.bets[bet]);
  console.log("winnerScore", winnerScore);
  // if selvmakker
  if (selectedPlayers.length === 1) {
    winnerScore *= 3;
    loserScore = Math.ceil(winnerScore / 3);
  }

  loserScore = winnerScore;

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
};

export const LaksePointStrategy: IPointStrategy = {
  calculatePoints(
    players: Player[],
    selectedPlayers: string[],
    bet: string,
    betAmount: number,
    trickAmount: number,
    hardBetWinners: string[] = []
  ): [number, Player[]] {
    if (bet in strategies.lakse.hardBets) {
      return calculateHardBet(players, selectedPlayers, bet, hardBetWinners);
    } else {
      return calculateRegularBet(
        players,
        selectedPlayers,
        bet,
        betAmount,
        trickAmount
      );
    }
  },
};
