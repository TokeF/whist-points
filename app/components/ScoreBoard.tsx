import React from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { View, Text } from "react-native";
import { RootState } from "../store/store";

const ScoreBoard = () => {
  const players = useSelector((state: RootState) => state.game.playerNames);

  return (
    console.log(players),
    (
      <View style={style.container}>
        {players.map((player, index) => (
          <Text key={index}>{player}</Text>
        ))}
      </View>
    )
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "lightgrey",
  },
});

export default ScoreBoard;
