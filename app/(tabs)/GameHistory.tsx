import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../styles/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import {
  setPlayers,
  setTrickHistory,
  setStartDate,
  setId,
  setStrategy,
} from "../../store/gameSlice";
import { useRouter } from "expo-router";
import GlobalStyles from "../styles/GlobalStyles";

const GameHistory = () => {
  const [games, setGames] = useState<{ id: string; startDate: string }[]>([]);
  const dispatch = useDispatch();
  const router = useRouter();

  const loadGames = async () => {
    try {
      const gameCollection = await AsyncStorage.getItem("gameCollection");
      const gameIds = gameCollection ? JSON.parse(gameCollection) : [];

      const loadedGames = [];
      for (const gameId of gameIds) {
        const gameData = await AsyncStorage.getItem(gameId);
        if (gameData) {
          const { startDate } = JSON.parse(gameData);
          loadedGames.push({ id: gameId, startDate });
        }
      }
      setGames(loadedGames);
    } catch (error) {
      console.error("Failed to load games from local storage:", error);
    }
  };

  const handleGamePress = async (gameId: string) => {
    try {
      const gameData = await AsyncStorage.getItem(gameId);
      if (gameData) {
        const { players, trickHistory, startDate, id, strategy } =
          JSON.parse(gameData);
        dispatch(setPlayers(players));
        dispatch(setTrickHistory(trickHistory));
        dispatch(setStartDate(startDate));
        dispatch(setId(id));
        dispatch(setStrategy(strategy));
        router.push("/GameScreen");
      }
    } catch (error) {
      console.error("Failed to load selected game state:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadGames();
    }, [])
  );

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <Text
        style={[
          GlobalStyles.titleText,
          { textAlign: "center", paddingTop: 20 },
        ]}
      >
        Previous Games
      </Text>
      <ScrollView contentContainerStyle={styles.container}>
        {games.reverse().map((game) => (
          <TouchableOpacity
            key={game.id}
            style={styles.gameItem}
            onPress={() => handleGamePress(game.id)}
          >
            <Text style={styles.gameText}>Game Date: {game.startDate}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  gameItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: Colors.backgroundDark,
    borderRadius: 5,
  },
  gameText: {
    fontSize: 16,
  },
});

export default GameHistory;
