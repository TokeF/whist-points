import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { View, Text } from "react-native";
import { RootState } from "../../store/store";
import { Chip, Icon } from "react-native-paper";
import StrategyFactory from "@/services/StrategyFactory";
import IPointStrategy, { strategies } from "@/services/IPointStrategy";
import { setPlayers } from "@/store/gameSlice";
import GlobalStyles from "../styles/GlobalStyles";
import SelectDropdown from "react-native-select-dropdown";
import { FontAwesome } from "@expo/vector-icons";
import { TrickAmounts } from "@/models/types";

const ScoreBoard = () => {
  const dispatch = useDispatch();

  const strategyName = useSelector((state: RootState) => state.game.strategy);
  const players = useSelector((state: RootState) => state.game.players);

  const scoreStrategy: IPointStrategy =
    StrategyFactory.getStrategy(strategyName);
  const strategy = strategies[strategyName];
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [bet, setSelectedBet] = useState<string>("");

  const handleToggleChip = async (name: string) => {
    const updatedChips = selectedPlayers.includes(name)
      ? selectedPlayers.filter((chip) => chip !== name)
      : [...selectedPlayers, name];
    setSelectedPlayers(updatedChips);
  };

  const addPoints = () => {
    if (selectedPlayers.length >= 1) {
      const updatedPlayers = scoreStrategy.calculatePoints(
        players,
        selectedPlayers
      );
      dispatch(setPlayers(updatedPlayers));

      // Uncheck all chips
      setSelectedPlayers([]);
    }
  };

  return (
    // scoreboard
    <View>
      <View style={styles.container}>
        {players.map((player, index) => (
          <View key={index} style={styles.playerRow}>
            <Chip
              textStyle={styles.playerName}
              key={index}
              showSelectedOverlay={true}
              showSelectedCheck={false}
              selected={selectedPlayers.includes(player.name)}
              onPress={() => handleToggleChip(player.name)}
            >
              {player.name}
            </Chip>
            <Text style={styles.playerScore}>{player.score}</Text>
          </View>
        ))}
      </View>

      <View style={styles.dropdownContainer}>
        {/* Numbers sropdown */}
        <SelectDropdown
          data={TrickAmounts}
          onSelect={(selectedItem) => setSelectedBet(selectedItem)}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                {/* {selectedItem && (
                <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
              )} */}
                <Text style={styles.dropdownButtonTxtStyle}>
                  {selectedItem || "Select your mood"}
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

        {/* Bet dropdown */}
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
                  {selectedItem || "Select your mood"}
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
      <TouchableOpacity style={GlobalStyles.button} onPress={addPoints}>
        <Text>Add points</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: "flex-start",
    flexDirection: "column",
    marginBottom: 10,
    padding: 10,
    width: "100%",
  },
  dropdownContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  playerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    paddingVertical: 5,
  },
  playerName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  playerScore: {
    fontSize: 16,
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
    flex: 1,
  },
  dropdownButtonStyle: {
    flex: 1,
    height: 50,
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
});

export default ScoreBoard;
