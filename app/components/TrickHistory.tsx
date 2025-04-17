import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { HistoryLog } from "@/models/types";
import theme from "../styles/Theme";
import GlobalStyles from "../styles/GlobalStyles";

const TrickHistory = ({ trickHistory }: { trickHistory: HistoryLog[] }) => {
  return (
    <View style={styles.historyContainer}>
      <Text style={styles.historyHeader}>Trick History</Text>
      <FlatList
        data={trickHistory}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <View style={styles.historyRow}>
            <Text style={styles.historyCellHeader}>Caller</Text>
            <Text style={styles.historyCellHeader}>Partner</Text>
            <Text style={styles.historyCellHeader}>Bet</Text>
            <Text style={styles.historyCellHeader}>Bet Amount</Text>
            <Text style={styles.historyCellHeader}>Trick Amount</Text>
            <Text style={styles.historyCellHeader}>Points</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.historyRow}>
            <Text style={styles.historyCell}>{item.caller}</Text>
            <Text style={styles.historyCell}>{item.partner || "-"}</Text>
            <Text style={styles.historyCell}>{item.bet}</Text>
            <Text style={styles.historyCell}>{item.betAmount}</Text>
            <Text style={styles.historyCell}>{item.trickAmount}</Text>
            <Text style={styles.historyCell}>{item.points}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  historyContainer: {
    marginTop: theme.spacing.large,
    width: "100%",
    maxHeight: 300,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.medium,
    backgroundColor: theme.colors.backgroundLight,
    padding: theme.spacing.medium,
  },
  historyHeader: {
    fontSize: theme.fontSizes.medium,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  historyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: theme.spacing.small,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
  historyCellHeader: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: theme.fontSizes.small,
    color: theme.colors.textPrimary,
  },
  historyCell: {
    flex: 1,
    textAlign: "center",
    fontSize: theme.fontSizes.small,
    color: theme.colors.textPrimary,
  },
});

export default TrickHistory;
