import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import theme from "../styles/Theme";
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
  const [games, setGames] = useState<
    {
      id: string;
      date: string;
      players: { name: string; score: number }[];
      strategy: string;
    }[]
  >([]);
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
          const { players, trickHistory, startDate, id, strategy } =
            JSON.parse(gameData);
          loadedGames.push({
            id: gameId,
            date: startDate,
            players: players,
            strategy: strategy,
          });
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

  const clearHistory = async () => {
    Alert.alert("Warning", "This will delete all game history. Are you sure?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const gameCollection = await AsyncStorage.getItem("gameCollection");
            const gameIds = gameCollection ? JSON.parse(gameCollection) : [];

            for (const gameId of gameIds) {
              await AsyncStorage.removeItem(gameId);
            }
            await AsyncStorage.removeItem("gameCollection");
            setGames([]);
          } catch (error) {
            console.error("Failed to clear game history:", error);
          }
        },
      },
    ]);
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
        {games.reverse().map((game) => {
          const date = new Date(game.date);
          const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString(
            [],
            { hour: "2-digit", minute: "2-digit" }
          )}`;
          const playerInitials = game.players
            .slice(0, 4)
            .map((player: { name: string; score: number }) =>
              player.name.slice(0, 2)
            )
            .join(", ");

          return (
            <TouchableOpacity
              key={game.id}
              style={styles.gameItem}
              onPress={() => handleGamePress(game.id)}
            >
              <Text style={styles.gameText}>
                {formattedDate} - {game.strategy} - {playerInitials}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <TouchableOpacity
        onPress={clearHistory}
        style={[
          GlobalStyles.button,
          {
            width: "50%",
            alignSelf: "center",
            marginTop: theme.spacing.large,
            marginBottom: theme.spacing.large,
            alignItems: "center",
          },
        ]}
      >
        <Text style={GlobalStyles.buttonText}>Clear History</Text>
      </TouchableOpacity>
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
    backgroundColor: theme.colors.backgroundDark,
    borderRadius: 5,
  },
  gameText: {
    fontSize: 16,
  },
});

export default GameHistory;
