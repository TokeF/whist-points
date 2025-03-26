export type Player = {
  name: string;
  score: number;
};

export interface GameState {
  players: Player[];
  strategy: string;
}

export default {};
