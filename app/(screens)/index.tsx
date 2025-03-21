import React from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import GlobalStyles from "../styles/GlobalStyles";

const index = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Welcome to Whist Points Tracker</Text>
      <Link href="/GameSetup">
        <TouchableOpacity style={GlobalStyles.button}>
          <Text style={GlobalStyles.buttonText}>New Game</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default index;
