import { Player } from "../../models/types";

const PointService = {
  addPoint: (score: number) => {
    return score + 1;
  },
  resetPoints: (players: Player[]) => {
    return players.map((player) => ({ ...player, score: 0 }));
  },
};

export default PointService;
