import { Player } from "@/models/types";
import { LaksePointStrategy } from "@/services/LaksePointStrategy";

export const mockPlayers: Player[] = [
  { name: "1", score: 0 },
  { name: "2", score: 0 },
  { name: "3", score: 0 },
  { name: "4", score: 0 },
];

export const mockStrategies = {
  lakse: {
    bets: {
      normal: 1,
      gode: 1.25,
    },
    hardBets: {
      sol: 9,
      "ren sol": 10,
    },
  },
};

describe("LaksePointStrategy calculatePoints regular bets", () => {
  describe("Selvmakker, Won", () => {
    const selectedPlayers = ["1"];
    const betAmount = 7;
    const trickAmount = 7;

    const testCases = [
      { bet: "normal", expectedScore: 5 * 3 },
      { bet: "gode", expectedScore: Math.ceil(5 * 1.25) * 3 },
      { bet: "vip", expectedScore: Math.ceil(5 * 1.25) * 3 },
      { bet: "halve", expectedScore: Math.ceil(5 * 1.75) * 3 },
      { bet: "sans", expectedScore: 5 * 2 * 3 },
    ];

    test.each(testCases)("$description", ({ bet, expectedScore }) => {
      const [score, updatedPlayers] = LaksePointStrategy.calculatePoints(
        mockPlayers,
        selectedPlayers,
        bet,
        betAmount,
        trickAmount,
        []
      );

      expect(score).toBe(expectedScore);
      const loserScore = -Math.ceil(expectedScore / 3);
      expect(updatedPlayers[0].score).toBe(expectedScore);
      expect(updatedPlayers[1].score).toBe(loserScore);
      expect(updatedPlayers[2].score).toBe(loserScore);
      expect(updatedPlayers[3].score).toBe(loserScore);
    });
  });

  describe("Selvmakker, Lost", () => {
    const selectedPlayers = ["1"];
    const betAmount = 7;
    const trickAmount = 6;

    const testCases = [
      { bet: "normal", expectedScore: -4 * 3 },
      { bet: "gode", expectedScore: -Math.ceil(4 * 1.25) * 3 },
      { bet: "vip", expectedScore: -Math.ceil(4 * 1.25) * 3 },
      { bet: "halve", expectedScore: -Math.ceil(4 * 1.75) * 3 },
      { bet: "sans", expectedScore: -4 * 2 * 3 },
    ];

    test.each(testCases)("$description", ({ bet, expectedScore }) => {
      const [score, updatedPlayers] = LaksePointStrategy.calculatePoints(
        mockPlayers,
        selectedPlayers,
        bet,
        betAmount,
        trickAmount,
        []
      );

      expect(score).toBe(expectedScore);
      const loserScore = -Math.ceil(expectedScore / 3);
      expect(updatedPlayers[0].score).toBe(expectedScore);
      expect(updatedPlayers[1].score).toBe(loserScore);
      expect(updatedPlayers[2].score).toBe(loserScore);
      expect(updatedPlayers[3].score).toBe(loserScore);
    });
  });

  describe("Partner, Won", () => {
    const selectedPlayers = ["1", "2"];
    const betAmount = 7;
    const trickAmount = 7;

    const testCases = [
      { bet: "normal", expectedScore: 5 },
      { bet: "gode", expectedScore: Math.ceil(5 * 1.25) },
      { bet: "vip", expectedScore: Math.ceil(5 * 1.25) },
      { bet: "halve", expectedScore: Math.ceil(5 * 1.75) },
      { bet: "sans", expectedScore: 5 * 2 },
    ];

    test.each(testCases)("$description", ({ bet, expectedScore }) => {
      const [score, updatedPlayers] = LaksePointStrategy.calculatePoints(
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

  describe("Partner, Lost", () => {
    const selectedPlayers = ["1", "2"];
    const betAmount = 7;
    const trickAmount = 6;

    const testCases = [
      { bet: "normal", expectedScore: -4 },
      { bet: "gode", expectedScore: -Math.ceil(4 * 1.25) },
      { bet: "vip", expectedScore: -Math.ceil(4 * 1.25) },
      { bet: "halve", expectedScore: -Math.ceil(4 * 1.75) },
      { bet: "sans", expectedScore: -4 * 2 },
    ];

    test.each(testCases)("$description", ({ bet, expectedScore }) => {
      const [score, updatedPlayers] = LaksePointStrategy.calculatePoints(
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

describe("LaksePointStrategy calculatePoints hard bets", () => {
  describe("Single better, Won", () => {
    const selectedPlayers = ["1"];
    const betAmount = 7;
    const trickAmount = 7;

    const testCases = [
      { bet: "sol", expectedScore: 60 },
      { bet: "ren sol", expectedScore: 100 },
      { bet: "bordlægger", expectedScore: 240 },
    ];

    test.each(testCases)("$description", ({ bet, expectedScore }) => {
      const [score, updatedPlayers] = LaksePointStrategy.calculatePoints(
        mockPlayers,
        selectedPlayers,
        bet,
        betAmount,
        trickAmount,
        ["1"]
      );

      expect(score).toBe(expectedScore);
      expect(updatedPlayers[0].score).toBe(expectedScore);
      expect(updatedPlayers[1].score).toBe(-Math.ceil(expectedScore / 3));
      expect(updatedPlayers[2].score).toBe(-Math.ceil(expectedScore / 3));
      expect(updatedPlayers[3].score).toBe(-Math.ceil(expectedScore / 3));
    });
  });

  describe("Single better, Lost", () => {
    const selectedPlayers = ["1"];
    const betAmount = 7;
    const trickAmount = 7;

    const testCases = [
      { bet: "sol", expectedScore: -80 },
      { bet: "ren sol", expectedScore: -176 },
      { bet: "bordlægger", expectedScore: -832 },
    ];

    test.each(testCases)("$description", ({ bet, expectedScore }) => {
      const [score, updatedPlayers] = LaksePointStrategy.calculatePoints(
        mockPlayers,
        selectedPlayers,
        bet,
        betAmount,
        trickAmount,
        []
      );

      expect(score).toBe(expectedScore);
      expect(updatedPlayers[0].score).toBe(expectedScore);
      expect(updatedPlayers[1].score).toBe(-Math.ceil(expectedScore / 3));
      expect(updatedPlayers[2].score).toBe(-Math.ceil(expectedScore / 3));
      expect(updatedPlayers[3].score).toBe(-Math.ceil(expectedScore / 3));
    });
  });

  describe("Two betters, Two Winners", () => {
    const selectedPlayers = ["1", "2"];
    const betAmount = 7;
    const trickAmount = 7;

    const testCases = [
      { bet: "sol", expectedScore: 60 },
      { bet: "ren sol", expectedScore: 100 },
      { bet: "bordlægger", expectedScore: 240 },
    ];

    test.each(testCases)("$description", ({ bet, expectedScore }) => {
      const [score, updatedPlayers] = LaksePointStrategy.calculatePoints(
        mockPlayers,
        selectedPlayers,
        bet,
        betAmount,
        trickAmount,
        ["1", "2"]
      );

      expect(score).toBe(expectedScore);
      expect(updatedPlayers[0].score).toBe(expectedScore);
      expect(updatedPlayers[1].score).toBe(expectedScore);
      expect(updatedPlayers[2].score).toBe(-expectedScore);
      expect(updatedPlayers[3].score).toBe(-expectedScore);
    });
  });

  describe("Two betters, Two Losers", () => {
    const selectedPlayers = ["1", "2"];
    const betAmount = 7;
    const trickAmount = 7;

    const testCases = [
      { bet: "sol", expectedScore: -80 },
      { bet: "ren sol", expectedScore: -176 },
      { bet: "bordlægger", expectedScore: -832 },
    ];

    test.each(testCases)("$description", ({ bet, expectedScore }) => {
      const [score, updatedPlayers] = LaksePointStrategy.calculatePoints(
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

  describe("Two betters, Single Winner", () => {
    const selectedPlayers = ["1", "2"];
    const betAmount = 7;
    const trickAmount = 7;

    const testCases = [
      { bet: "sol", expectedScore: 60 },
      { bet: "ren sol", expectedScore: 100 },
      { bet: "bordlægger", expectedScore: 240 },
    ];

    test.each(testCases)("$description", ({ bet, expectedScore }) => {
      const [score, updatedPlayers] = LaksePointStrategy.calculatePoints(
        mockPlayers,
        selectedPlayers,
        bet,
        betAmount,
        trickAmount,
        ["2"]
      );

      expect(score).toBe(expectedScore);
      const loserScore = -Math.ceil(expectedScore / 3);
      expect(updatedPlayers[0].score).toBe(loserScore);
      expect(updatedPlayers[1].score).toBe(expectedScore);
      expect(updatedPlayers[2].score).toBe(loserScore);
      expect(updatedPlayers[3].score).toBe(loserScore);
    });
  });
});
