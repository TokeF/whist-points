import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { Link } from "expo-router";
import GlobalStyles from "../styles/GlobalStyles";
import { Picker } from "@react-native-picker/picker";
import { strategies } from "@/services/IPointStrategy";
import { useDispatch } from "react-redux";
import { setStrategy } from "../../store/gameSlice";

const SelectStrategy = () => {
  const [selectedStrategy, setSelectedStrategy] = useState<string>(
    Object.keys(strategies)[0]
  );
  const dispatch = useDispatch();

  const handleStartGame = () => {
    dispatch(setStrategy(selectedStrategy));
  };

  const selectedStrategyDescription = strategies[selectedStrategy]?.description;

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <View style={style.container}>
        <Text style={{ fontSize: 24 }}>Select Strategy</Text>
        <Picker
          selectedValue={selectedStrategy}
          style={style.picker}
          onValueChange={(itemValue) => setSelectedStrategy(itemValue)}
        >
          {Object.entries(strategies).map(([key, strategy]) => (
            <Picker.Item label={key} value={key} key={key} />
          ))}
        </Picker>
        <Text style={style.description}>{selectedStrategyDescription}</Text>
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
    alignItems: "center",
    marginBottom: 10,
  },
  picker: {
    width: 200,
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: "center",
  },
});

export default SelectStrategy;
