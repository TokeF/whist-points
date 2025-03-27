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
  addPlayerName,
  removePlayerName,
  setPlayerNames,
} from "../store/gameSlice";
import GlobalStyles from "../styles/GlobalStyles";
import { FontAwesome } from "@expo/vector-icons";
import { RootState } from "../store/store";

const EnterNames = () => {
  const dispatch = useDispatch();
  const playerNames = useSelector((state: RootState) => state.game.playerNames);

  React.useEffect(() => {
    if (playerNames.length === 0) {
      dispatch(setPlayerNames(["", "", "", ""]));
    }
  }, [dispatch, playerNames]);

  const handleNameChange = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    dispatch(setPlayerNames(newNames));
  };

  const handleRemoveName = (index: number) => {
    dispatch(removePlayerName(index));
  };

  const handleAddName = () => {
    dispatch(addPlayerName(""));
  };

  const handleNext = (): void => {
    const newNames = playerNames.map((x, i) =>
      x === "" ? `Player ${i + 1}` : x
    );
    dispatch(setPlayerNames(newNames));
  };

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Enter Player Names</Text>
      {playerNames.map((name, index) => (
        <View key={index} style={styles.nameContainer}>
          <View style={styles.removeButton}></View>
          <TextInput
            style={styles.nameInput}
            placeholder={`Player ${index + 1}`}
            value={name}
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
