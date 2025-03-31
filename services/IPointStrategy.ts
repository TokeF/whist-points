import { Player } from "@/models/types";

export interface IStrategy {
  key: string;
  shortName: string;
  bets: string[];
  description: string;
}

export const strategies: Record<string, IStrategy> = {
  lakse: {
    key: "lakse",
    shortName: "Lakse Drengene",
    bets: ["vip", "halve", "sans", "gode", "sol", "ren sol", "bordlægger"],
    description:
      "A strategy focused on maximizing points through specific tricks.",
  },
  simple: {
    key: "simple",
    shortName: "Trick Count",
    bets: ["sans", "gode"],
    description:
      "A straightforward strategy counting the number of tricks won.",
  },
  "win-count": {
    key: "win-count",
    bets: ["vip", "halve", "sans", "gode", "sol", "ren sol", "bordlægger"],
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
