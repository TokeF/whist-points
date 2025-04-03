import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../styles/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

const GameHistory = () => {
  const [games, setGames] = useState<{ id: string; startDate: string }[]>([]);

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

  useFocusEffect(
    useCallback(() => {
      loadGames();
    }, [])
  );

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        {games.map((game) => (
          <View key={game.id} style={styles.gameItem}>
            <Text style={styles.gameText}>Game Date: {game.startDate}</Text>
          </View>
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
    backgroundColor: Colors.backgroundLight,
    borderRadius: 5,
  },
  gameText: {
    fontSize: 16,
  },
});

export default GameHistory;
