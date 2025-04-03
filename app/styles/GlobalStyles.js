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
    backgroundColor: Colors.buttonPrimary,
    padding: 10,
    borderRadius: 5,
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
