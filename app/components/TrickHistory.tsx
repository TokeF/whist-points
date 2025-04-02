import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { HistoryLog } from "@/models/types";
import Colors from "../styles/Colors";

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
    marginTop: 40,
    width: "100%",
    maxHeight: 300,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    backgroundColor: Colors.backgroundLight,
  },
  historyHeader: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  historyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  historyCellHeader: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  historyCell: {
    flex: 1,
    textAlign: "center",
  },
});

export default TrickHistory;
