import { ClassicStrategy } from "./ClassicStrategy";
import IPointStrategy from "./IPointStrategy";
import { LaksePointStrategy } from "./LaksePointStrategy";
import { WinCountStrategy } from "./WinCountStrategy";

export default class StrategyFactory {
  static getStrategy(strategyName: string): IPointStrategy {
    switch (strategyName) {
      case "lakse":
        return LaksePointStrategy;
      case "winCount":
        return WinCountStrategy;
      case "classic":
        return ClassicStrategy;
      default:
        throw new Error(`Unknown strategy: ${strategyName}`);
    }
  }
}
