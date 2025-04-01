import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import StrategyFactory from "@/services/StrategyFactory";
import IPointStrategy, { strategies } from "@/services/IPointStrategy";
import { setPlayers } from "@/store/gameSlice";
import GlobalStyles from "../styles/GlobalStyles";
import { BetAmounts, HistoryLog, TrickAmounts } from "@/models/types";
import PlayerGrid from "./PlayerScoreGrid";
import BetDropdowns from "./BetDropdows";
import TrickHistory from "./TrickHistory";
import TrickModal from "./TrickModal";

const ScoreBoard = () => {
  const dispatch = useDispatch();

  const strategyName = useSelector((state: RootState) => state.game.strategy);
  const players = useSelector((state: RootState) => state.game.players);

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
  const [trickHistory, setHistory] = useState<HistoryLog[]>([]);

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
    setHistory(newHist);

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
        <Text>Add points</Text>
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
