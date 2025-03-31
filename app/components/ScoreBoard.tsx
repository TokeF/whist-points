import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Modal, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { View, Text } from "react-native";
import { RootState } from "../../store/store";
import { Chip } from "react-native-paper";
import StrategyFactory from "@/services/StrategyFactory";
import IPointStrategy, { strategies } from "@/services/IPointStrategy";
import { setPlayers } from "@/store/gameSlice";
import GlobalStyles from "../styles/GlobalStyles";
import SelectDropdown from "react-native-select-dropdown";
import { FontAwesome } from "@expo/vector-icons";
import { BetAmounts, HistoryLog, TrickAmounts } from "@/models/types";

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
  const [isWarningVisible, setWarningVisible] = useState<boolean>(false);
  const [trickHistory, setHistory] = useState<HistoryLog[]>([]);
  console.log(trickHistory);

  const handleToggleChip = async (name: string) => {
    const updatedChips = selectedPlayers.includes(name)
      ? selectedPlayers.filter((chip) => chip !== name)
      : [...selectedPlayers, name];
    setSelectedPlayers(updatedChips);
  };

  const addPoints = () => {
    if (selectedPlayers.length === 0) {
      setWarningVisible(true); // Show warning modal
    } else {
      setModalVisible(true); // Open the modal for trick amount
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
    // scoreboard
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={styles.gridHeader}>
          <Text style={[styles.gridHeaderText]}>Player</Text>
          <Text style={styles.gridHeaderText}>Score</Text>
        </View>
        {players.map((player, index) => (
          <View key={index} style={styles.gridRow}>
            <Chip
              textStyle={styles.playerName}
              showSelectedOverlay={true}
              showSelectedCheck={false}
              selected={selectedPlayers.includes(player.name)}
              onPress={() => handleToggleChip(player.name)}
              style={styles.gridCell}
            >
              <View style={styles.chipContent}>
                <Text style={styles.playerName}>{player.name}</Text>
                <Text style={styles.playerScore}>{player.score}</Text>
              </View>
            </Chip>
          </View>
        ))}
      </View>

      <View style={styles.dropdownContainer}>
        {/* Numbers sropdown */}
        <View>
          <Text>Bet Amount</Text>
          <SelectDropdown
            data={BetAmounts}
            onSelect={(selectedItem) => setSelectedBetAmount(selectedItem)}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  {/* {selectedItem && (
                <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
              )} */}
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {selectedItem}
                  </Text>
                  <FontAwesome
                    name={isOpened ? "chevron-up" : "chevron-down"}
                    style={styles.dropdownButtonArrowStyle}
                  />
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View
                  style={{
                    ...styles.dropdownItemStyle,
                    ...(isSelected && { backgroundColor: "#D2D9DF" }),
                  }}
                >
                  {/* <Icon name={item.icon} style={styles.dropdownItemIconStyle} /> */}
                  <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
                </View>
              );
            }}
            defaultValueByIndex={0}
            dropdownStyle={styles.dropdownMenuStyle}
          />
        </View>

        {/* Bet dropdown */}
        <View>
          <Text>Bet Type</Text>
          <SelectDropdown
            data={strategy.bets}
            onSelect={(selectedItem) => setSelectedBet(selectedItem)}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  {/* {selectedItem && (
                <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
              )} */}
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {selectedItem}
                  </Text>
                  <FontAwesome
                    name={isOpened ? "chevron-up" : "chevron-down"}
                    style={styles.dropdownButtonArrowStyle}
                  />
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View
                  style={{
                    ...styles.dropdownItemStyle,
                    ...(isSelected && { backgroundColor: "#D2D9DF" }),
                  }}
                >
                  {/* <Icon name={item.icon} style={styles.dropdownItemIconStyle} /> */}
                  <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
                </View>
              );
            }}
            defaultValueByIndex={0}
            dropdownStyle={styles.dropdownMenuStyle}
          />
        </View>
      </View>

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

      {/* History */}
      <View style={styles.historyContainer}>
        <Text style={styles.historyHeader}>Trick History</Text>
        <FlatList
          data={trickHistory}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={
            <View style={styles.historyRow}>
              <Text style={styles.historyCellHeader}>Caller</Text>
              <Text style={styles.historyCellHeader}>Partner</Text>
              <Text style={styles.historyCellHeader}>Bet</Text>
              <Text style={styles.historyCellHeader}>Bet Amount</Text>
              <Text style={styles.historyCellHeader}>Trick Amount</Text>
              <Text style={styles.historyCellHeader}>Points</Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.historyRow}>
              <Text style={styles.historyCell}>{item.caller}</Text>
              <Text style={styles.historyCell}>{item.partner || "-"}</Text>
              <Text style={styles.historyCell}>{item.bet}</Text>
              <Text style={styles.historyCell}>{item.betAmount}</Text>
              <Text style={styles.historyCell}>{item.trickAmount}</Text>
              <Text style={styles.historyCell}>{item.points}</Text>
            </View>
          )}
        />
      </View>

      {/* Warning Modal */}
      <Modal
        visible={isWarningVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setWarningVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.warningContent}>
            <Text style={styles.warningText}>
              Please select at least one player.
            </Text>
            <TouchableOpacity
              style={GlobalStyles.button}
              onPress={() => setWarningVisible(false)}
            >
              <Text>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal for selecting trick amount */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Trick Amount</Text>
            <SelectDropdown
              data={TrickAmounts}
              onSelect={(selectedItem) => setSelectedTrickAmount(selectedItem)}
              defaultValueByIndex={7}
              renderButton={(selectedItem, isOpened) => {
                return (
                  <View style={styles.dropdownModalButtonStyle}>
                    <Text style={styles.dropdownButtonTxtStyle}>
                      {selectedItem}
                    </Text>
                    <FontAwesome
                      name={isOpened ? "chevron-up" : "chevron-down"}
                      style={styles.dropdownButtonArrowStyle}
                    />
                  </View>
                );
              }}
              renderItem={(item, index, isSelected) => {
                return (
                  <View
                    style={{
                      ...styles.dropdownItemStyle,
                      ...(isSelected && { backgroundColor: "#D2D9DF" }),
                    }}
                  >
                    <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
                  </View>
                );
              }}
              dropdownStyle={styles.dropdownMenuStyle}
            />
            <TouchableOpacity
              style={GlobalStyles.button}
              onPress={confirmTrickAmount}
            >
              <Text>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  dropdownContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingBottom: 10,
  },
  chipContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  playerName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
  },
  playerScore: {
    flex: 1,
    fontSize: 16,
    color: "#007BFF",
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
    flex: 1,
  },
  dropdownButtonStyle: {
    width: 150,
    height: 50,
    backgroundColor: "#E9ECEF",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    padding: 5,
  },
  dropdownModalButtonStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    padding: 5,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownButtonArrowStyle: {
    fontSize: 14,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  warningContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  warningText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  historyContainer: {
    marginTop: 40,
    width: "100%",
    maxHeight: 300,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  historyHeader: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  historyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  historyCellHeader: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  historyCell: {
    flex: 1,
    textAlign: "center",
  },
  gridHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  gridHeaderText: {
    flex: 1,
    fontWeight: "bold",
    // textAlign: "center",
    fontSize: 18,
  },
  gridRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    alignItems: "center",
  },
  gridCell: {
    flex: 1,
    textAlign: "center",
  },
});

export default ScoreBoard;
