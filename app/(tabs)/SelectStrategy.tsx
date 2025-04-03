import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Link } from "expo-router";
import GlobalStyles from "../styles/GlobalStyles";
import { Picker } from "@react-native-picker/picker";
import { strategies } from "@/services/IPointStrategy";
import { useDispatch } from "react-redux";
import { setStrategy, setStartDate, setId } from "../../store/gameSlice";
import theme from "../styles/Theme";
import uuid from "react-native-uuid";

const SelectStrategy = () => {
  const [selectedStrategy, setSelectedStrategy] = useState<string>(
    Object.keys(strategies)[0]
  );
  const dispatch = useDispatch();

  const handleStartGame = () => {
    const gameId = uuid.v4();
    dispatch(setStrategy(selectedStrategy));
    dispatch(setStartDate(new Date().toISOString()));
    dispatch(setId(gameId));
  };

  const selectedStrategyDescription = strategies[selectedStrategy]?.description;

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <View style={style.container}>
        <Text style={GlobalStyles.titleText}>Select Strategy</Text>
        <Picker
          selectedValue={selectedStrategy}
          style={style.picker}
          onValueChange={(itemValue) => setSelectedStrategy(itemValue)}
        >
          {Object.entries(strategies).map(([key, strategy]) => (
            <Picker.Item label={key} value={key} key={key} />
          ))}
        </Picker>
        <ScrollView style={style.descriptionContainer}>
          <Text style={style.description}>{selectedStrategyDescription}</Text>
        </ScrollView>
        <Link
          href={{
            pathname: "/GameScreen",
          }}
          asChild
        >
          <TouchableOpacity
            style={GlobalStyles.button}
            onPress={handleStartGame}
          >
            <Text style={GlobalStyles.buttonText}>Start Game</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
  },
  picker: {
    width: 150,
  },
  descriptionContainer: {
    height: 150,
    width: "80%",
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    backgroundColor: theme.colors.backgroundLight,
  },
  description: {
    flexGrow: 1,
    fontSize: 16,
    textAlign: "center",
    width: "100%",
  },
});

export default SelectStrategy;
