import React from "react";
import { View } from "react-native";
import ScoreBoard from "../components/ScoreBoard";

const GameScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ScoreBoard />
    </View>
  );
};

export default GameScreen;
