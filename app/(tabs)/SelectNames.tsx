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
} from "../../store/gameSlice";
import GlobalStyles from "../styles/GlobalStyles";
import { FontAwesome } from "@expo/vector-icons";
import { RootState } from "../../store/store";

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
    if (players.length >= 10) {
      alert("You can only add up to 10 players.");
      return;
    }
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
      <Text style={GlobalStyles.titleText}>Enter Player Names</Text>
      <View style={styles.listContainer}>
        {players.map((player, index) => (
          <View key={index} style={styles.nameContainer}>
            {/* probably wrong way to space venly */}
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
              <FontAwesome name={"minus"} size={12} color="#E76F51" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleAddName()}
      >
        <FontAwesome name={"plus-square-o"} size={24} color="#2a9d8f" />
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
  listContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  nameInput: {
    padding: 5,
    flex: 2,
    fontSize: 16,
  },
  removeButton: {
    flex: 1,
    marginLeft: 10,
  },
  addButton: {
    padding: 10,
    alignItems: "center",
    marginBottom: 40,
  },
});

export default EnterNames;
