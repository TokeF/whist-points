import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import GlobalStyles from "../styles/GlobalStyles";
import { Picker } from "@react-native-picker/picker";
import { IStrategy, strategies } from "../services/IPointStrategy";

const GameSetup = () => {
  const [selectedStrategy, setSelectedStrategy] = useState<IStrategy>(
    strategies[0]
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Game Setup</Text>

      <View>
        <Text>Select Strategy</Text>
        <Picker
          selectedValue={selectedStrategy}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue) => setSelectedStrategy(itemValue)}
        >
          {strategies.map((strategy) => (
            <Picker.Item label={strategy.shortName} value={strategy.key} />
          ))}
        </Picker>
      </View>
      <View>
        <Link
          href={{
            pathname: "/GameScreen",
            params: { strategy: selectedStrategy.key },
          }}
          asChild
        >
          <TouchableOpacity style={GlobalStyles.button}>
            <Text style={GlobalStyles.buttonText}>Go to Game</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default GameSetup;
