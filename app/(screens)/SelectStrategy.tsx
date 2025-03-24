import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams, Link } from "expo-router";
import GlobalStyles from "../styles/GlobalStyles";
import { Picker } from "@react-native-picker/picker";
import { strategies } from "../services/IPointStrategy";

const SelectStrategy = () => {
  const { playerNames } = useLocalSearchParams<{ playerNames: string[] }>();
  const [selectedStrategy, setSelectedStrategy] = useState<string>(
    strategies[0].key
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Select Strategy</Text>
      <Picker
        selectedValue={selectedStrategy}
        style={{ height: 50, width: 150 }}
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
          params: { playerNames, strategy: selectedStrategy },
        }}
        asChild
      >
        <TouchableOpacity style={GlobalStyles.button}>
          <Text style={GlobalStyles.buttonText}>Start Game</Text>
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
};

export default SelectStrategy;
