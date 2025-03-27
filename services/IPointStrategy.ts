import { Player } from "@/models/types";

export interface IStrategy {
  key: string;
  shortName: string;
  description: string;
}

export const strategies: Record<string, IStrategy> = {
  lakse: {
    key: "lakse",
    shortName: "Lakse Drengene",
    description:
      "A strategy focused on maximizing points through specific tricks.",
  },
  simple: {
    key: "simple",
    shortName: "Trick Count",
    description:
      "A straightforward strategy counting the number of tricks won.",
  },
  "win-count": {
    key: "win-count",
    shortName: "Count Wins",
    description: "A strategy that emphasizes the total number of wins.",
  },
};

export default interface IPointStrategy {
  calculatePoints(players: Player[], selectedPlayers: string[]): Player[];
}
