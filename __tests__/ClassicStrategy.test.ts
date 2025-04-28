import { Player } from "@/models/types";
import { ClassicStrategy } from "@/services/ClassicStrategy";

const mockPlayers: Player[] = [
  { name: "1", score: 0 },
  { name: "2", score: 0 },
  { name: "3", score: 0 },
  { name: "4", score: 0 },
];

describe("ClassicStrategy calculatePoints", () => {
  describe("Single player (Selvmakker)", () => {
    const selectedPlayers = ["1"];
    const betAmount = 7;
    const trickAmount = 7;

    const testCases = [
      { bet: "alm", expectedScore: 2 * 3 },
      { bet: "gode", expectedScore: 2 * 2 * 3 },
      { bet: "sans", expectedScore: 2 * 2 * 3 },
      { bet: "vip", expectedScore: 2 * 2 * 3 },
    ];

    test.each(testCases)("$bet bet", ({ bet, expectedScore }) => {
      const [score, updatedPlayers] = ClassicStrategy.calculatePoints(
        mockPlayers,
        selectedPlayers,
        bet,
        betAmount,
        trickAmount,
        []
      );

      expect(score).toBe(expectedScore);
      const opponentScore = -expectedScore / 3;
      expect(updatedPlayers[0].score).toBe(expectedScore);
      expect(updatedPlayers[1].score).toBe(opponentScore);
      expect(updatedPlayers[2].score).toBe(opponentScore);
      expect(updatedPlayers[3].score).toBe(opponentScore);
    });
  });

  describe("Two players (Partner)", () => {
    const selectedPlayers = ["1", "2"];
    const betAmount = 7;
    const trickAmount = 7;

    const testCases = [
      { bet: "alm", expectedScore: 2 },
      { bet: "gode", expectedScore: 2 * 2 },
      { bet: "sans", expectedScore: 2 * 2 },
      { bet: "vip", expectedScore: 2 * 2 },
    ];

    test.each(testCases)("$bet bet", ({ bet, expectedScore }) => {
      const [score, updatedPlayers] = ClassicStrategy.calculatePoints(
        mockPlayers,
        selectedPlayers,
        bet,
        betAmount,
        trickAmount,
        []
      );

      expect(score).toBe(expectedScore);
      expect(updatedPlayers[0].score).toBe(expectedScore);
      expect(updatedPlayers[1].score).toBe(expectedScore);
      expect(updatedPlayers[2].score).toBe(-expectedScore);
      expect(updatedPlayers[3].score).toBe(-expectedScore);
    });
  });
});

describe("ClassicStrategy calculatePoints - Hard Bets", () => {
  describe("Single player, won", () => {
    const selectedPlayers = ["1"];

    const testCases = [
      { bet: "sol", expectedScore: 12 },
      { bet: "ren sol", expectedScore: 24 },
      { bet: "bordlægger", expectedScore: 48 },
      { bet: "ren bordlægger", expectedScore: 96 },
    ];

    test.each(testCases)("$bet bet", ({ bet, expectedScore }) => {
      const [score, updatedPlayers] = ClassicStrategy.calculatePoints(
        mockPlayers,
        selectedPlayers,
        bet,
        0, // betAmount is irrelevant for hard bets
        0, // trickAmount is irrelevant for hard bets
        ["1"]
      );

      expect(score).toBe(expectedScore);
      const opponentScore = -expectedScore / 3;
      expect(updatedPlayers[0].score).toBe(expectedScore);
      expect(updatedPlayers[1].score).toBe(opponentScore);
      expect(updatedPlayers[2].score).toBe(opponentScore);
      expect(updatedPlayers[3].score).toBe(opponentScore);
    });
  });

  describe("Single player, lost", () => {
    const selectedPlayers = ["1"];

    const testCases = [
      { bet: "sol", expectedScore: 12 },
      { bet: "ren sol", expectedScore: 24 },
      { bet: "bordlægger", expectedScore: 48 },
      { bet: "ren bordlægger", expectedScore: 96 },
    ];

    test.each(testCases)("$bet bet", ({ bet, expectedScore }) => {
      const [score, updatedPlayers] = ClassicStrategy.calculatePoints(
        mockPlayers,
        selectedPlayers,
        bet,
        0, // betAmount is irrelevant for hard bets
        0, // trickAmount is irrelevant for hard bets
        []
      );

      expect(score).toBe(-expectedScore);
      const opponentScore = expectedScore / 3;
      expect(updatedPlayers[0].score).toBe(-expectedScore);
      expect(updatedPlayers[1].score).toBe(opponentScore);
      expect(updatedPlayers[2].score).toBe(opponentScore);
      expect(updatedPlayers[3].score).toBe(opponentScore);
    });
  });

  describe("Two players, won", () => {
    const selectedPlayers = ["1", "2"];

    const testCases = [
      { bet: "sol", expectedScore: 12 },
      { bet: "ren sol", expectedScore: 24 },
      { bet: "bordlægger", expectedScore: 48 },
      { bet: "ren bordlægger", expectedScore: 96 },
    ];

    test.each(testCases)("$bet bet", ({ bet, expectedScore }) => {
      const [score, updatedPlayers] = ClassicStrategy.calculatePoints(
        mockPlayers,
        selectedPlayers,
        bet,
        0, // betAmount is irrelevant for hard bets
        0, // trickAmount is irrelevant for hard bets
        ["1", "2"]
      );

      expect(score).toBe(expectedScore);
      expect(updatedPlayers[0].score).toBe(expectedScore);
      expect(updatedPlayers[1].score).toBe(expectedScore);
      expect(updatedPlayers[2].score).toBe(-expectedScore);
      expect(updatedPlayers[3].score).toBe(-expectedScore);
    });
  });

  describe("Two players, one lost", () => {
    const selectedPlayers = ["1", "2"];

    const testCases = [
      { bet: "sol", expectedScore: 12 },
      { bet: "ren sol", expectedScore: 24 },
      { bet: "bordlægger", expectedScore: 48 },
      { bet: "ren bordlægger", expectedScore: 96 },
    ];

    test.each(testCases)("$bet bet", ({ bet, expectedScore }) => {
      const [score, updatedPlayers] = ClassicStrategy.calculatePoints(
        mockPlayers,
        selectedPlayers,
        bet,
        0, // betAmount is irrelevant for hard bets
        0, // trickAmount is irrelevant for hard bets
        ["2"]
      );

      expect(score).toBe(expectedScore);
      const opponentScore = expectedScore / 3;
      expect(updatedPlayers[0].score).toBe(-opponentScore);
      expect(updatedPlayers[1].score).toBe(expectedScore);
      expect(updatedPlayers[2].score).toBe(-opponentScore);
      expect(updatedPlayers[3].score).toBe(-opponentScore);
    });
  });

  describe("Two players, both lost", () => {
    const selectedPlayers = ["1", "2"];

    const testCases = [
      { bet: "sol", expectedScore: 12 },
      { bet: "ren sol", expectedScore: 24 },
      { bet: "bordlægger", expectedScore: 48 },
      { bet: "ren bordlægger", expectedScore: 96 },
    ];

    test.each(testCases)("$bet bet", ({ bet, expectedScore }) => {
      const [score, updatedPlayers] = ClassicStrategy.calculatePoints(
        mockPlayers,
        selectedPlayers,
        bet,
        0, // betAmount is irrelevant for hard bets
        0, // trickAmount is irrelevant for hard bets
        []
      );

      expect(score).toBe(-expectedScore);
      expect(updatedPlayers[0].score).toBe(-expectedScore);
      expect(updatedPlayers[1].score).toBe(-expectedScore);
      expect(updatedPlayers[2].score).toBe(expectedScore);
      expect(updatedPlayers[3].score).toBe(expectedScore);
    });
  });

  describe("Three players, won", () => {
    const selectedPlayers = ["1", "2", "3"];

    const testCases = [
      { bet: "sol", expectedScore: 12 },
      { bet: "ren sol", expectedScore: 24 },
      { bet: "bordlægger", expectedScore: 48 },
      { bet: "ren bordlægger", expectedScore: 96 },
    ];

    test.each(testCases)("$bet bet", ({ bet, expectedScore }) => {
      const [score, updatedPlayers] = ClassicStrategy.calculatePoints(
        mockPlayers,
        selectedPlayers,
        bet,
        0, // betAmount is irrelevant for hard bets
        0, // trickAmount is irrelevant for hard bets
        ["1", "2", "3"]
      );

      expect(score).toBe(expectedScore);
      expect(updatedPlayers[0].score).toBe(expectedScore);
      expect(updatedPlayers[1].score).toBe(expectedScore);
      expect(updatedPlayers[2].score).toBe(expectedScore);
      expect(updatedPlayers[3].score).toBe(-3 * expectedScore);
    });
  });

  describe("Three players, lost", () => {
    const selectedPlayers = ["1", "2", "3"];

    const testCases = [
      { bet: "sol", expectedScore: 12 },
      { bet: "ren sol", expectedScore: 24 },
      { bet: "bordlægger", expectedScore: 48 },
      { bet: "ren bordlægger", expectedScore: 96 },
    ];

    test.each(testCases)("$bet bet", ({ bet, expectedScore }) => {
      const [score, updatedPlayers] = ClassicStrategy.calculatePoints(
        mockPlayers,
        selectedPlayers,
        bet,
        0, // betAmount is irrelevant for hard bets
        0, // trickAmount is irrelevant for hard bets
        []
      );

      expect(score).toBe(-expectedScore);
      expect(updatedPlayers[0].score).toBe(-expectedScore);
      expect(updatedPlayers[1].score).toBe(-expectedScore);
      expect(updatedPlayers[2].score).toBe(-expectedScore);
      expect(updatedPlayers[3].score).toBe(3 * expectedScore);
    });
  });
});
