import React from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { Link } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import {
  addPlayer,
  removePlayer,
  setPlayers,
  updatePlayerName,
} from "../store/gameSlice";
import GlobalStyles from "../styles/GlobalStyles";
import { FontAwesome } from "@expo/vector-icons";
import { RootState } from "../store/store";

const EnterNames = () => {
  const dispatch = useDispatch();
  const players = useSelector((state: RootState) => state.game.players);

  React.useEffect(() => {
    if (players.length === 0) {
      dispatch(
        setPlayers([
          { name: "", score: 0 },
          { name: "", score: 0 },
          { name: "", score: 0 },
          { name: "", score: 0 },
        ])
      );
    }
  }, [dispatch, players]);

  const handleNameChange = (index: number, name: string) => {
    dispatch(updatePlayerName({ index, name }));
  };

  const handleRemoveName = (index: number) => {
    dispatch(removePlayer(index));
  };

  const handleAddName = () => {
    dispatch(addPlayer({ name: "", score: 0 }));
  };

  const handleNext = (): void => {
    const updatedPlayers = players.map((player, i) => ({
      ...player,
      name: player.name === "" ? `Player ${i + 1}` : player.name,
    }));
    dispatch(setPlayers(updatedPlayers));
  };

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Enter Player Names</Text>
      {players.map((player, index) => (
        <View key={index} style={styles.nameContainer}>
          <View style={styles.removeButton}></View>
          <TextInput
            style={styles.nameInput}
            placeholder={`Player ${index + 1}`}
            value={player.name}
            onChangeText={(text) => handleNameChange(index, text)}
          />
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => handleRemoveName(index)}
          >
            <Text style={{ color: "red" }}>-</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleAddName()}
      >
        <FontAwesome name={"plus-square-o"} size={24} color="green" />
      </TouchableOpacity>

      <Link
        href={{
          pathname: "/SelectStrategy",
        }}
        asChild
      >
        <TouchableOpacity style={GlobalStyles.button} onPress={handleNext}>
          <Text style={GlobalStyles.buttonText}>Next</Text>
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  nameInput: {
    padding: 5,
    flex: 2,
  },
  removeButton: {
    flex: 1,
    marginLeft: 10,
  },
  addButton: {
    padding: 10,
    alignItems: "center",
  },
});

export default EnterNames;
