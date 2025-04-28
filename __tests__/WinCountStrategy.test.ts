import { Player } from "@/models/types";
import { WinCountStrategy } from "@/services/WinCountStrategy";

const mockPlayers: Player[] = [
  { name: "1", score: 0 },
  { name: "2", score: 0 },
  { name: "3", score: 0 },
  { name: "4", score: 0 },
];

describe("WinCountStrategy calculatePoints", () => {
  describe("Regular bets", () => {
    const selectedPlayers = ["1"];
    const betAmount = 7;
    const trickAmount = 7;

    test("Single player wins", () => {
      const [score, updatedPlayers] = WinCountStrategy.calculatePoints(
        mockPlayers,
        selectedPlayers,
        "alm",
        betAmount,
        trickAmount,
        []
      );

      expect(score).toBe(1);
      expect(updatedPlayers[0].score).toBe(1);
      expect(updatedPlayers[1].score).toBe(0);
      expect(updatedPlayers[2].score).toBe(0);
      expect(updatedPlayers[3].score).toBe(0);
    });

    test("Single player loses", () => {
      const [score, updatedPlayers] = WinCountStrategy.calculatePoints(
        mockPlayers,
        selectedPlayers,
        "alm",
        betAmount,
        trickAmount - 1,
        []
      );

      expect(score).toBe(-1);
      expect(updatedPlayers[0].score).toBe(-1);
      expect(updatedPlayers[1].score).toBe(0);
      expect(updatedPlayers[2].score).toBe(0);
      expect(updatedPlayers[3].score).toBe(0);
    });

    test("Two players win", () => {
      const selectedPlayers = ["1", "2"];
      const [score, updatedPlayers] = WinCountStrategy.calculatePoints(
        mockPlayers,
        selectedPlayers,
        "alm",
        betAmount,
        trickAmount,
        []
      );

      expect(score).toBe(1);
      expect(updatedPlayers[0].score).toBe(1);
      expect(updatedPlayers[1].score).toBe(1);
      expect(updatedPlayers[2].score).toBe(0);
      expect(updatedPlayers[3].score).toBe(0);
    });

    test("Two players lose", () => {
      const selectedPlayers = ["1", "2"];
      const [score, updatedPlayers] = WinCountStrategy.calculatePoints(
        mockPlayers,
        selectedPlayers,
        "alm",
        betAmount,
        trickAmount - 1,
        []
      );

      expect(score).toBe(-1);
      expect(updatedPlayers[0].score).toBe(-1);
      expect(updatedPlayers[1].score).toBe(-1);
      expect(updatedPlayers[2].score).toBe(0);
      expect(updatedPlayers[3].score).toBe(0);
    });
  });

  describe("Hard bets", () => {
    test("Single player wins hard bet", () => {
      const selectedPlayers = ["1"];
      const [score, updatedPlayers] = WinCountStrategy.calculatePoints(
        mockPlayers,
        selectedPlayers,
        "sol",
        0,
        0,
        ["1"]
      );

      expect(score).toBe(1);
      expect(updatedPlayers[0].score).toBe(1);
      expect(updatedPlayers[1].score).toBe(0);
      expect(updatedPlayers[2].score).toBe(0);
      expect(updatedPlayers[3].score).toBe(0);
    });

    test("Single player loses hard bet", () => {
      const selectedPlayers = ["1"];
      const [score, updatedPlayers] = WinCountStrategy.calculatePoints(
        mockPlayers,
        selectedPlayers,
        "sol",
        0,
        0,
        []
      );

      expect(score).toBe(-1);
      expect(updatedPlayers[0].score).toBe(-1);
      expect(updatedPlayers[1].score).toBe(0);
      expect(updatedPlayers[2].score).toBe(0);
      expect(updatedPlayers[3].score).toBe(0);
    });

    test("Two players win hard bet", () => {
      const selectedPlayers = ["1", "2"];
      const [score, updatedPlayers] = WinCountStrategy.calculatePoints(
        mockPlayers,
        selectedPlayers,
        "sol",
        0,
        0,
        ["1", "2"]
      );

      expect(score).toBe(1);
      expect(updatedPlayers[0].score).toBe(1);
      expect(updatedPlayers[1].score).toBe(1);
      expect(updatedPlayers[2].score).toBe(0);
      expect(updatedPlayers[3].score).toBe(0);
    });

    test("Two players lose hard bet", () => {
      const selectedPlayers = ["1", "2"];
      const [score, updatedPlayers] = WinCountStrategy.calculatePoints(
        mockPlayers,
        selectedPlayers,
        "sol",
        0,
        0,
        []
      );

      expect(score).toBe(-1);
      expect(updatedPlayers[0].score).toBe(-1);
      expect(updatedPlayers[1].score).toBe(-1);
      expect(updatedPlayers[2].score).toBe(0);
      expect(updatedPlayers[3].score).toBe(0);
    });
  });
});
