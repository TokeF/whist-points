import IPointStrategy from "./IPointStrategy";

export default class LaksePointStrategy implements IPointStrategy {
  calculatePoints(currentPoints: number): number {
    return currentPoints + 1;
  }
}
