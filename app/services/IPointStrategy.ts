export interface PointStrategy {
  calculatePoints(currentPoints: number): number;
}

export interface IStrategy {
  key: string;
  shortName: string;
}

export const strategies: IStrategy[] = [
  { key: "lakse", shortName: "Lakse Drengene" },
  { key: "simple", shortName: "Trick Count" },
];
