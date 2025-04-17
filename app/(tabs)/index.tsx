import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { Link } from "expo-router";
import GlobalStyles from "../styles/GlobalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { resetGame } from "@/store/gameSlice";
import theme from "../styles/Theme";

const index = () => {
  const dispatch = useDispatch();

  const handleNewGame = () => {
    dispatch(resetGame());
  };

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <Text style={[GlobalStyles.titleText, styles.wildText]}>
        The Whist Points Tracker
      </Text>
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
    paddingTop: theme.spacing.large,
    letterSpacing: 5,
    textTransform: "uppercase",
    fontFamily: "Cochin",
    color: theme.colors.textSecondary,
    textShadowColor: theme.colors.textPrimary,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 25,
  },
});

export default index;
