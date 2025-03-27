import React from "react";
import { useLocalSearchParams } from "expo-router";
import ScoreBoard from "../components/ScoreBoard";
import { SafeAreaView } from "react-native-safe-area-context";

const GameScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ScoreBoard />
    </SafeAreaView>
  );
};

export default GameScreen;
