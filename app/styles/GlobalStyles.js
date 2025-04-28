import { StyleSheet } from "react-native";
import theme from "./Theme";

const GlobalStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.backgroundLight,
  },
  button: {
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius.medium,
    borderWidth: 1,
    borderColor: theme.colors.buttonPrimary,
    backgroundColor: theme.colors.buttonPrimary,
  },
  buttonText: {
    color: theme.colors.buttonPrimaryText,
    fontSize: theme.fontSizes.medium,
    textAlign: "center",
    fontWeight: "bold",
  },
  titleText: {
    fontSize: theme.fontSizes.title,
    marginBottom: theme.spacing.large,
    fontWeight: "bold",
    color: theme.colors.textPrimary,
  },
  container: {
    flex: 1,
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.backgroundLight,
  },
  centeredText: {
    textAlign: "center",
    fontSize: theme.fontSizes.medium,
    color: theme.colors.textPrimary,
  },
});

export default GlobalStyles;
