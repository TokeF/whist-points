import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { View, Text } from "react-native";
import { RootState } from "../store/store";
import { Chip } from "react-native-paper";
import { updatePlayerScore } from "../store/gameSlice"; // Import the action

const ScoreBoard = () => {
  const players = useSelector((state: RootState) => state.game.players);
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const dispatch = useDispatch();

  const handleToggleChip = async (name: string) => {
    const updatedChips = selectedPlayers.includes(name)
      ? selectedPlayers.filter((chip) => chip !== name)
      : [...selectedPlayers, name];
    setSelectedPlayers(updatedChips);
  };

  const addPoints = () => {
    if (selectedPlayers.length >= 1) {
      let score = 1;
      if (selectedPlayers.length === 1) {
        score = 2;
      }
      selectedPlayers.forEach((playerName) => {
        dispatch(updatePlayerScore({ name: playerName, points: score }));
        setSelectedPlayers([]);
      });
    }
  };

  return (
    <View>
      <View style={style.container}>
        {players.map((player, index) => (
          <View key={index} style={style.playerRow}>
            <Chip
              textStyle={style.playerName}
              key={index}
              showSelectedOverlay={true}
              showSelectedCheck={false}
              selected={selectedPlayers.includes(player.name)}
              onPress={() => handleToggleChip(player.name)}
            >
              {player.name}
            </Chip>
            <Text style={style.playerScore}>{player.score}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity onPress={addPoints}>
        <Text>Add points</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    alignContent: "flex-start",
    flexDirection: "column",
    marginBottom: 10,
    padding: 10,
    width: "100%",
  },
  playerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    paddingVertical: 5,
  },
  playerName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  playerScore: {
    fontSize: 16,
  },
});

export default ScoreBoard;
