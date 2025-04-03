import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { Link } from "expo-router";
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
      <Text style={styles.wildText}>The Whist Points Tracker</Text>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
        }}
      >
        <Link href="/SelectNames" asChild>
          <TouchableOpacity style={GlobalStyles.button} onPress={handleNewGame}>
            <Text style={GlobalStyles.buttonText}>New Game</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wildText: {
    flex: 1,
    paddingTop: 100,
    justifyContent: "flex-start",
    fontSize: 32, // Large font size
    fontWeight: "bold",
    color: "#2ca2a8", // Vibrant orange color
    textAlign: "center",
    textShadowColor: "#000", // Black shadow
    textShadowOffset: { width: 2, height: 2 }, // Shadow offset
    textShadowRadius: 25, // Shadow blur radius
    letterSpacing: 5, // Add spacing between letters
    textTransform: "uppercase", // Make the text uppercase
    fontFamily: "Cochin", // Use a built-in font or load a custom font
  },
});

export default index;
