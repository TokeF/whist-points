import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Link } from "expo-router";
import GlobalStyles from "../styles/GlobalStyles";

const EnterNames = () => {
  const [playerNames, setPlayerNames] = useState<string[]>(["", "", "", ""]);

  const handleNameChange = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Enter Player Names</Text>
      {playerNames.map((name, index) => (
        <TextInput
          key={index}
          style={GlobalStyles.input}
          placeholder={`Player ${index + 1}`}
          value={name}
          onChangeText={(text) => handleNameChange(index, text)}
        />
      ))}
      <Link
        href={{
          pathname: "/SelectStrategy",
          params: { playerNames },
        }}
        asChild
      >
        <TouchableOpacity style={GlobalStyles.button}>
          <Text style={GlobalStyles.buttonText}>Next</Text>
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
};

export default EnterNames;
