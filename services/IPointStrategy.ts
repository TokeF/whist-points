export interface IStrategy {
  key: string;
  shortName: string;
}

export const strategies: IStrategy[] = [
  { key: "lakse", shortName: "Lakse Drengene" },
  { key: "simple", shortName: "Trick Count" },
];

export default interface IPointStrategy {
  calculatePoints(currentPoints: number): number;
}
