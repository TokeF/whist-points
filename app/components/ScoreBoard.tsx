import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Player } from "../models/types";
import PointService from "../services/PointService";
import GlobalStyles from "../styles/GlobalStyles";

const ScoreBoard = ({ strategy }: { strategy: string }) => {
  const [players, setPlayers] = useState<Player[]>([
    { name: "Player 1", score: 0 },
    { name: "Player 2", score: 0 },
    { name: "Player 3", score: 0 },
    { name: "Player 4", score: 0 },
  ]);

  console.log(strategy);
  const addPoint = (index: number) => {
    const newPlayers = [...players];
    newPlayers[index].score = PointService.addPoint(newPlayers[index].score);
    setPlayers(newPlayers);
  };

  const resetPoints = () => {
    setPlayers(PointService.resetPoints(players));
  };

  return (
    <View>
      {players.map((player, index) => (
        <View key={index} style={{ margin: 10 }}>
          <Text>
            {player.name}: {player.score}
          </Text>
          <TouchableOpacity
            style={GlobalStyles.button}
            onPress={() => addPoint(index)}
          >
            <Text style={GlobalStyles.buttonText}>Add Points</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity style={GlobalStyles.button} onPress={() => resetPoints}>
        <Text style={GlobalStyles.buttonText}>Reset Points</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ScoreBoard;
