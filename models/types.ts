export type Player = {
  name: string;
  score: number;
};

export const TrickAmounts: number[] = [7, 8, 9, 10, 11, 12, 13];

export default {};

export type HistoryLog = {
  caller: string;
  partner: string | null;
  bet: string;
  betAmount: number;
  trickAmount: number;
  points: number;
};
