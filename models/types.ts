export type Player = {
  name: string;
  score: number;
};

export const TrickAmounts: number[] = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
];

export const BetAmounts: number[] = TrickAmounts.slice(7);

export default {};

export type HistoryLog = {
  caller: string;
  partner: string | null;
  bet: string;
  betAmount: number;
  trickAmount: number;
  points: number;
};
