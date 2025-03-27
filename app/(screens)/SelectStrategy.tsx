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
    strategies[0].key
  );
  const dispatch = useDispatch();

  const handleStartGame = () => {
    dispatch(setStrategy(selectedStrategy));
  };

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <View style={style.container}>
        <Text style={{ fontSize: 24 }}>Select Strategy</Text>
        <Picker
          selectedValue={selectedStrategy}
          style={style.picker}
          onValueChange={(itemValue) => setSelectedStrategy(itemValue)}
        >
          {strategies.map((strategy) => (
            <Picker.Item
              label={strategy.shortName}
              value={strategy.key}
              key={strategy.key}
            />
          ))}
        </Picker>
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
});

export default SelectStrategy;
