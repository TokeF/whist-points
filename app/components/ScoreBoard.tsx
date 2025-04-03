import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import StrategyFactory from "@/services/StrategyFactory";
import IPointStrategy, { strategies } from "@/services/IPointStrategy";
import { setPlayers, setTrickHistory } from "@/store/gameSlice";
import GlobalStyles from "../styles/GlobalStyles";
import { BetAmounts, HistoryLog, TrickAmounts } from "@/models/types";
import PlayerGrid from "./PlayerScoreGrid";
import BetDropdowns from "./BetDropdows";
import TrickHistory from "./TrickHistory";
import TrickModal from "./TrickModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ScoreBoard = () => {
  const dispatch = useDispatch();

  const gameState = useSelector((state: RootState) => state.game);
  const gameId = useSelector((state: RootState) => state.game.id);
  const startDate = useSelector((state: RootState) => state.game.startDate);
  const strategyName = useSelector((state: RootState) => state.game.strategy);
  const players = useSelector((state: RootState) => state.game.players);
  const trickHistory = useSelector(
    (state: RootState) => state.game.trickHistory
  );

  const scoreStrategy: IPointStrategy =
    StrategyFactory.getStrategy(strategyName);
  const strategy = strategies[strategyName];
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [bet, setSelectedBet] = useState<string>(strategy.bets[0]);
  const [betAmount, setSelectedBetAmount] = useState<number>(BetAmounts[0]);
  const [trickAmount, setSelectedTrickAmount] = useState<number>(
    TrickAmounts[7]
  );
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const handleToggleChip = async (name: string) => {
    const updatedChips = selectedPlayers.includes(name)
      ? selectedPlayers.filter((chip) => chip !== name)
      : [...selectedPlayers, name];
    setSelectedPlayers(updatedChips);
  };

  const addPoints = () => {
    if (selectedPlayers.length === 0) {
      alert("Select at least 1 player");
    } else {
      setModalVisible(true);
    }
  };

  useEffect(() => {
    saveGameStateToLocalStorage();
  }, [players, trickHistory]);

  const saveGameStateToLocalStorage = async () => {
    try {
      const serializedState = JSON.stringify(gameState);
      await AsyncStorage.setItem(gameId, serializedState);

      // Update the master list of game IDs
      const gameCollection = await AsyncStorage.getItem("gameCollection");
      const gameIds = gameCollection ? JSON.parse(gameCollection) : [];
      if (!gameIds.includes(gameId)) {
        gameIds.push(gameId);
        await AsyncStorage.setItem("gameCollection", JSON.stringify(gameIds));
      }
    } catch (error) {
      console.error("Failed to save game state to local storage:", error);
    }
  };

  const confirmTrickAmount = () => {
    const [points, updatedPlayers] = scoreStrategy.calculatePoints(
      players,
      selectedPlayers,
      bet,
      betAmount,
      trickAmount
    );

    const newLog: HistoryLog = {
      caller: selectedPlayers[0],
      partner: selectedPlayers[1] || null,
      bet,
      betAmount,
      trickAmount,
      points: points,
    };

    const newHist = [newLog, ...trickHistory];
    dispatch(setPlayers(updatedPlayers));
    dispatch(setTrickHistory(newHist));

    // Reset states
    setSelectedPlayers([]);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <PlayerGrid
        players={players}
        selectedPlayers={selectedPlayers}
        handleToggleChip={handleToggleChip}
      />
      <BetDropdowns
        strategy={strategy}
        setSelectedBet={setSelectedBet}
        setSelectedBetAmount={setSelectedBetAmount}
      />
      <TouchableOpacity
        style={[
          GlobalStyles.button,
          {
            width: "80%",
            alignSelf: "center",
            marginTop: 20,
            alignItems: "center",
          },
        ]}
        onPress={addPoints}
      >
        <Text style={GlobalStyles.buttonText}>Add points</Text>
      </TouchableOpacity>
      <TrickHistory trickHistory={trickHistory} />
      <TrickModal
        isVisible={isModalVisible}
        trickAmount={trickAmount}
        setTrickAmount={setSelectedTrickAmount}
        onConfirm={confirmTrickAmount}
        onCancel={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    justifyContent: "center",
    marginBottom: 10,
    padding: 10,
    width: "100%",
  },
});

export default ScoreBoard;
