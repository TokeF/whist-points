import React from "react";
import ScoreBoard from "../components/ScoreBoard";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Alert, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { View, Text, Button } from "react-native";
import GlobalStyles from "../styles/GlobalStyles";

const GameScreen = () => {
  const date = useSelector((state: RootState) => state.game.startDate);

  if (date === null) {
    return (
      <SafeAreaView style={GlobalStyles.safeArea}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 18, marginBottom: 20, textAlign: "center" }}>
            No game in progress. Start a new game by navigating to Home or
            continue a previous game.
          </Text>

          <TouchableOpacity
            style={GlobalStyles.button}
            onPress={() => router.push("/")}
          >
            <Text style={GlobalStyles.buttonText}>Home</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <ScoreBoard />
    </SafeAreaView>
  );
};

export default GameScreen;
