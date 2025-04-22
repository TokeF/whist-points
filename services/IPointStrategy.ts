import { Player } from "@/models/types";

export interface IStrategy {
  key: string;
  shortName: string;
  // Type of bets that can be made, and their point multiplier
  bets: Record<string, number>;
  // Bets that have a pre-determined "amount", <name, amount>, amount is used to calculate the score
  hardBets: Record<string, number>;
  description: string;
}

export const strategies: Record<string, IStrategy> = {
  lakse: {
    key: "lakse",
    shortName: "Lakse Drengene",
    bets: {
      normal: 1,
      gode: 1.25,
      vip: 1.25,
      halve: 1.75,
      sans: 2,
      sol: 1,
      "ren sol": 1,
      bordlægger: 1,
    },
    hardBets: {
      sol: 9,
      "ren sol": 10,
      bordlægger: 12,
    },
    description:
      "A strategy focused on maximizing points through specific tricks.",
  },
  simple: {
    key: "simple",
    shortName: "Trick Count",
    bets: {},
    hardBets: {},
    description:
      "A straightforward strategy counting the number of tricks won.",
  },
  "win-count": {
    key: "win-count",
    bets: {},
    hardBets: {},
    shortName: "Count Wins",
    description: "A strategy that emphasizes the total number of wins.",
  },
};

export default interface IPointStrategy {
  calculatePoints(
    players: Player[],
    selectedPlayers: string[],
    bet: string,
    betAmount: number,
    trickAmount: number
  ): [number, Player[]];
}
