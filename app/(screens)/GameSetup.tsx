import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import GlobalStyles from "../styles/GlobalStyles";

const GameSetup = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Game Setup</Text>
      <Link href="/GameScreen">
        <TouchableOpacity style={GlobalStyles.button}>
          <Text style={GlobalStyles.buttonText}>Go to Game</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default GameSetup;
