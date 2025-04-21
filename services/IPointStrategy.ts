import { Player } from "@/models/types";

export interface IStrategy {
  key: string;
  shortName: string;
  bets: Record<string, number>;
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
    description:
      "A strategy focused on maximizing points through specific tricks.",
  },
  simple: {
    key: "simple",
    shortName: "Trick Count",
    bets: {},
    description:
      "A straightforward strategy counting the number of tricks won.",
  },
  "win-count": {
    key: "win-count",
    bets: {},
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
