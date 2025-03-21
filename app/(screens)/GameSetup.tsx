import React from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import GlobalStyles from "../styles/GlobalStyles";

const GameSetup = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Game Setup</Text>
      <Link href="/GameScreen" asChild>
        <TouchableOpacity style={GlobalStyles.button}>
          <Text style={GlobalStyles.buttonText}>Go to Game</Text>
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
};

export default GameSetup;
