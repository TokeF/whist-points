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
import HardBetModal from "./HardBetModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import theme from "../styles/Theme";

const ScoreBoard = () => {
  const dispatch = useDispatch();

  const gameState = useSelector((state: RootState) => state.game);
  const gameId = useSelector((state: RootState) => state.game.id);
  const strategyName = useSelector((state: RootState) => state.game.strategy);
  const players = useSelector((state: RootState) => state.game.players);
  const trickHistory = useSelector(
    (state: RootState) => state.game.trickHistory
  );

  const scoreStrategy: IPointStrategy =
    StrategyFactory.getStrategy(strategyName);
  const strategy = strategies[strategyName];
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [hardBetWinners, setHardBetWinners] = useState<string[]>([]);
  const [bet, setSelectedBet] = useState<string>(Object.keys(strategy.bets)[0]);
  const [betAmount, setSelectedBetAmount] = useState<number>(BetAmounts[0]);
  const [trickAmount, setSelectedTrickAmount] = useState<number>(
    TrickAmounts[7]
  );
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const handleToggleChip = async (name: string) => {
    const isHardBet = Object.keys(strategy.hardBets).includes(bet);

    if (isHardBet) {
      const updatedChips = selectedPlayers.includes(name)
        ? selectedPlayers.filter((chip) => chip !== name)
        : [...selectedPlayers, name];
      setSelectedPlayers(updatedChips);
    } else {
      const updatedChips = selectedPlayers.includes(name)
        ? selectedPlayers.filter((chip) => chip !== name)
        : selectedPlayers.length < 2
        ? [...selectedPlayers, name]
        : [selectedPlayers[1], name]; // Remove the first player and add the new one
      setSelectedPlayers(updatedChips);
    }
  };

  const addPoints = () => {
    if (selectedPlayers.length === 0) {
      alert("Select at least 1 player");
    } else {
      setModalVisible(true);
    }
  };

  const undoLastAction = () => {
    if (trickHistory.length === 0) {
      alert("No actions to undo.");
      return;
    }

    const lastLog = trickHistory[0];
    const updatedHistory = trickHistory.slice(1);

    const revertedPlayers = players.map((player) => {
      const logPoints = lastLog.points;
      if (
        lastLog.caller === player.name ||
        (lastLog.partner && lastLog.partner === player.name)
      ) {
        return { ...player, score: player.score - logPoints };
      }
      return { ...player, score: player.score + logPoints };
    });

    dispatch(setPlayers(revertedPlayers));
    dispatch(setTrickHistory(updatedHistory));
  };

  useEffect(() => {
    saveGameStateToLocalStorage();
  }, [players, trickHistory]);

  const saveGameStateToLocalStorage = async () => {
    try {
      const serializedState = JSON.stringify(gameState);
      console.log("Saving game state to local storage:", serializedState);
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
      trickAmount,
      hardBetWinners
    );

    const isHardBet = Object.keys(strategies[strategyName].hardBets).includes(
      bet
    );

    const newLog: HistoryLog = {
      caller: selectedPlayers[0],
      partner: selectedPlayers[1] || null,
      bet,
      betAmount: isHardBet ? "-" : betAmount.toString(),
      trickAmount: isHardBet ? "-" : trickAmount.toString(),
      points: points,
    };

    const newHist = [newLog, ...trickHistory];
    dispatch(setPlayers(updatedPlayers));
    dispatch(setTrickHistory(newHist));

    // Reset states
    setSelectedPlayers([]);
    setHardBetWinners([]);
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
      <View
        style={{
          flexDirection: "row",
          width: "80%",
          alignSelf: "center",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={[
            GlobalStyles.button,
            {
              flex: 4,
              alignItems: "center",
              marginRight: theme.spacing.small,
            },
          ]}
          onPress={addPoints}
        >
          <Text style={GlobalStyles.buttonText}>Add points</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            GlobalStyles.button,
            {
              flex: 1,
              alignItems: "center",
            },
          ]}
          onPress={undoLastAction}
        >
          <Text style={GlobalStyles.buttonText}>Undo</Text>
        </TouchableOpacity>
      </View>
      <TrickHistory trickHistory={trickHistory} />
      {Object.keys(strategy.hardBets).includes(bet) ? (
        <HardBetModal
          isVisible={isModalVisible}
          setHardBetWinners={setHardBetWinners}
          onConfirm={confirmTrickAmount}
          onCancel={() => setModalVisible(false)}
          selectedPlayers={selectedPlayers}
        />
      ) : (
        <TrickModal
          isVisible={isModalVisible}
          trickAmount={trickAmount}
          setTrickAmount={setSelectedTrickAmount}
          onConfirm={confirmTrickAmount}
          onCancel={() => setModalVisible(false)}
        />
      )}
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
