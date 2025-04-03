import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Link, router } from "expo-router";
import GlobalStyles from "../styles/GlobalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { resetGame } from "@/store/gameSlice";

const index = () => {
  const dispatch = useDispatch();

  const handleNewGame = () => {
    dispatch(resetGame());
  };

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <Text>Welcome to Whist Points Tracker</Text>
      <Link href="/SelectNames" asChild>
        <TouchableOpacity style={GlobalStyles.button} onPress={handleNewGame}>
          <Text style={GlobalStyles.buttonText}>New Game</Text>
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
};

export default index;
