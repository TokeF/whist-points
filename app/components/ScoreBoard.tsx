import React from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { View, Text } from "react-native";
import { RootState } from "../store/store";

const ScoreBoard = () => {
  const players = useSelector((state: RootState) => state.game.players);

  return (
    <View style={style.container}>
      {players.map((player, index) => (
        <View key={index} style={style.playerRow}>
          <Text style={style.playerName}>{player.name}</Text>
          <Text style={style.playerScore}>{player.score}</Text>
        </View>
      ))}
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
