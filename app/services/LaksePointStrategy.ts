import { PointStrategy } from "./IPointStrategy";

export class LaksePointStrategy implements PointStrategy {
  calculatePoints(currentPoints: number): number {
    return currentPoints + 1;
  }
}
