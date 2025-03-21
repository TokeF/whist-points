import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import GlobalStyles from "../styles/GlobalStyles";
import { SafeAreaView } from "react-native-safe-area-context";

const index = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Welcome to Whist Points Tracker</Text>
      <Link href="/GameSetup" asChild>
        <TouchableOpacity style={GlobalStyles.button}>
          <Text style={GlobalStyles.buttonText}>New Game</Text>
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
};

export default index;
