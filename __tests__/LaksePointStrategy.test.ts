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

describe("LaksePointStrategy", () => {
  describe("calculatePoints for Regular Bets Selvmakker", () => {
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

  //     it("should calculate loserScore for multiple selected players", () => {
  //       const selectedPlayers = ["Alice", "Bob"];
  //       const bet = "normal";
  //       const betAmount = 7;
  //       const trickAmount = 5;

  //       const [score, updatedPlayers] = LaksePointStrategy.calculatePoints(
  //         mockPlayers,
  //         selectedPlayers,
  //         bet,
  //         betAmount,
  //         trickAmount
  //       );

  //       expect(score).toBeLessThan(0); // Loser score
  //       const alice = updatedPlayers.find((p) => p.name === "Alice");
  //       const bob = updatedPlayers.find((p) => p.name === "Bob");
  //       expect(alice?.score).toBeLessThan(10); // Alice's score should decrease
  //       expect(bob?.score).toBeLessThan(20); // Bob's score should decrease
  //     });
  //   });

  //   describe("calculatePoints for Hard Bets", () => {
  //     it("should assign winnerScore to players in both selectedPlayers and hardBetWinners", () => {
  //       const selectedPlayers = ["Alice", "Bob"];
  //       const hardBetWinners = ["Alice"];
  //       const bet = "sol";

  //       const [score, updatedPlayers] = LaksePointStrategy.calculatePoints(
  //         mockPlayers,
  //         selectedPlayers,
  //         bet,
  //         0,
  //         0,
  //         hardBetWinners
  //       );

  //       const alice = updatedPlayers.find((p) => p.name === "Alice");
  //       const bob = updatedPlayers.find((p) => p.name === "Bob");
  //       expect(alice?.score).toBeGreaterThan(10); // Alice's score should increase
  //       expect(bob?.score).toBeLessThan(20); // Bob's score should decrease
  //     });

  //     it("should assign loserScore to players in selectedPlayers but not in hardBetWinners", () => {
  //       const selectedPlayers = ["Alice", "Bob"];
  //       const hardBetWinners: string[] = [];
  //       const bet = "sol";

  //       const [score, updatedPlayers] = LaksePointStrategy.calculatePoints(
  //         mockPlayers,
  //         selectedPlayers,
  //         bet,
  //         0,
  //         0,
  //         hardBetWinners
  //       );

  //       const alice = updatedPlayers.find((p) => p.name === "Alice");
  //       const bob = updatedPlayers.find((p) => p.name === "Bob");
  //       expect(alice?.score).toBeLessThan(10); // Alice's score should decrease
  //       expect(bob?.score).toBeLessThan(20); // Bob's score should decrease
  //     });
  //   });

  //   describe("Edge Cases", () => {
  //     it("should handle empty selectedPlayers", () => {
  //       const selectedPlayers: string[] = [];
  //       const bet = "normal";
  //       const betAmount = 5;
  //       const trickAmount = 6;

  //       const [score, updatedPlayers] = LaksePointStrategy.calculatePoints(
  //         mockPlayers,
  //         selectedPlayers,
  //         bet,
  //         betAmount,
  //         trickAmount
  //       );

  //       expect(score).toBe(0); // No score change
  //       expect(updatedPlayers).toEqual(mockPlayers); // No changes to players
  //     });

  //     it("should handle invalid bets", () => {
  //       const selectedPlayers = ["Alice"];
  //       const bet = "invalid_bet";
  //       const betAmount = 5;
  //       const trickAmount = 6;

  //       expect(() =>
  //         LaksePointStrategy.calculatePoints(
  //           mockPlayers,
  //           selectedPlayers,
  //           bet,
  //           betAmount,
  //           trickAmount
  //         )
  //       ).toThrow(); // Should throw an error for invalid bets
  //     });
});
