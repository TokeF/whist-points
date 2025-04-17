import { StyleSheet } from "react-native";
import Colors from "./Theme";

const GlobalStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.backgroundLight,
  },
  button: {
    padding: Colors.spacing.medium,
    borderRadius: Colors.borderRadius.medium,
    borderWidth: 1,
    borderColor: Colors.buttonPrimary,
    backgroundColor: Colors.buttonPrimary,
  },
  buttonText: {
    color: Colors.white,
    fontSize: Colors.fontSizes.medium,
    textAlign: "center",
    fontWeight: "bold",
  },
  titleText: {
    fontSize: Colors.fontSizes.title,
    marginBottom: Colors.spacing.large,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  container: {
    flex: 1,
    padding: Colors.spacing.medium,
    backgroundColor: Colors.backgroundLight,
  },
  centeredText: {
    textAlign: "center",
    fontSize: Colors.fontSizes.medium,
    color: Colors.textPrimary,
  },
});

export default GlobalStyles;
