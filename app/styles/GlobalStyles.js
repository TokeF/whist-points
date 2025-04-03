import { StyleSheet } from "react-native";
import Colors from "./Colors";

const GlobalStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.backgroundLight,
  },
  button: {
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.buttonPrimaryText,
  },
  buttonText: {
    color: Colors.buttonPrimaryText,
    fontSize: 16,
  },
  titleText: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
});

export default GlobalStyles;
