import React from "react";
import { useLocalSearchParams } from "expo-router";
import ScoreBoard from "../components/ScoreBoard";
import { SafeAreaView } from "react-native-safe-area-context";

const GameScreen = () => {
  const { strategy, playerNames } = useLocalSearchParams<{
    strategy: string;
    playerNames: string[];
  }>();

  return (
    console.log(strategy, playerNames),
    (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ScoreBoard strategy={strategy} />
      </SafeAreaView>
    )
  );
};

export default GameScreen;
