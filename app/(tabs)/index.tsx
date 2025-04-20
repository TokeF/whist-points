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
        The Whist Point Tracker
      </Text>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
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
    paddingTop: theme.spacing.large * 2,
    textAlign: "center",
    fontSize: 50,
    textTransform: "uppercase",
    color: "#222",
    letterSpacing: 1,
    fontFamily: "Playfair Display",
    fontWeight: "400",
  },
});

export default index;
