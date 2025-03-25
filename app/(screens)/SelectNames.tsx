import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
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

  const handleRemoveName = (index: number) => {
    const newNames = playerNames.filter((_, i) => i !== index);
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
});

export default EnterNames;
