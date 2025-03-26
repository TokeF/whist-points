import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Player } from "../models/types";
import PointService from "../services/PointService";
import GlobalStyles from "../styles/GlobalStyles";

const ScoreBoard = ({
  strategy,
  playerNames,
}: {
  strategy: string;
  playerNames: string[];
}) => {
  const [players, setPlayers] = useState<Player[]>([]);

  console.log("scoreboard", strategy, playerNames);

  useEffect(() => {
    console.log("setting players", typeof playerNames);
    if (playerNames && playerNames.length > 0) {
      console.log("setting sdsddsdsdsds", playerNames);

      const initialPlayers = playerNames.map((name) => ({ name, score: 0 }));
      setPlayers(initialPlayers);
    }
  }, [playerNames]);

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
