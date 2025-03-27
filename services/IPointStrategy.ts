import { Player } from "@/models/types";

export interface IStrategy {
  key: string;
  shortName: string;
}

export const strategies: IStrategy[] = [
  { key: "lakse", shortName: "Lakse Drengene" },
  { key: "simple", shortName: "Trick Count" },
  { key: "win-count", shortName: "Count Wins" },
];

export default interface IPointStrategy {
  calculatePoints(players: Player[], selectedPlayers: string[]): Player[];
}
