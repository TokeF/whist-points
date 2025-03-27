import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { View, Text } from "react-native";
import { RootState } from "../store/store";
import { Chip } from "react-native-paper";

const ScoreBoard = () => {
  const players = useSelector((state: RootState) => state.game.players);
  const [selectedPlayer1, setSelectedPlayer1] = useState("");
  const [selectedPlayer2, setSelectedPlayer2] = useState("");
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const handleToggleChip = async (name: string) => {
    const updatedChips = selectedPlayers.includes(name)
      ? selectedPlayers.filter((chip) => chip !== name)
      : [...selectedPlayers, name];
    setSelectedPlayers(updatedChips);
  };

  console.log(selectedPlayer1, selectedPlayer2);

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
