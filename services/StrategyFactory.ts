import IPointStrategy from "./IPointStrategy";
import { LaksePointStrategy } from "./LaksePointStrategy";
import { WinCountStrategy } from "./WinCountStrategy";

export default class StrategyFactory {
  static getStrategy(strategyName: string): IPointStrategy {
    switch (strategyName) {
      case "lakse":
        return LaksePointStrategy;
      case "win-count":
        return WinCountStrategy;
      default:
        throw new Error(`Unknown strategy: ${strategyName}`);
    }
  }
}
