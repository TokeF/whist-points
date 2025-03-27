import React from "react";
import { useLocalSearchParams } from "expo-router";
import ScoreBoard from "../components/ScoreBoard";
import { SafeAreaView } from "react-native-safe-area-context";

const GameScreen = () => {
  return (
    <SafeAreaView>
      <ScoreBoard />
    </SafeAreaView>
  );
};

export default GameScreen;
