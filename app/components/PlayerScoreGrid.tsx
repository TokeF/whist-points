import { Text, View, StyleSheet } from "react-native";
import { Chip } from "react-native-paper";
import { Player } from "@/models/types";

interface PlayerGridProps {
  players: Player[];
  selectedPlayers: string[];
  handleToggleChip: (name: string) => void;
}

const PlayerGrid: React.FC<PlayerGridProps> = ({
  players,
  selectedPlayers,
  handleToggleChip,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.gridHeader}>
        <Text style={styles.gridHeaderText}>Player</Text>
        <Text style={[styles.gridHeaderText, styles.gridHeaderScore]}>
          Score
        </Text>
      </View>
      {players.map((player, index) => (
        <View key={index} style={styles.gridRow}>
          <Chip
            textStyle={styles.playerName}
            showSelectedOverlay={true}
            showSelectedCheck={false}
            selected={selectedPlayers.includes(player.name)}
            onPress={() => handleToggleChip(player.name)}
            style={styles.gridCell}
          >
            <View style={styles.chipContent}>
              <Text style={styles.playerName}>{player.name}</Text>
              <Text style={[styles.playerScore, styles.gridCellScore]}>
                {player.score}
              </Text>
            </View>
          </Chip>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    justifyContent: "center",
    marginBottom: 10,
    padding: 10,
    width: "100%",
  },
  gridHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  gridHeaderText: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 18,
    paddingLeft: 15,
  },
  gridHeaderScore: {
    textAlign: "right",
    paddingRight: 20,
  },

  gridRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    alignItems: "center",
  },
  gridCell: {
    flex: 1,
    textAlign: "left",
  },
  gridCellScore: {
    textAlign: "right",
    paddingRight: 20,
  },
  chipContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  playerName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
  },
  playerScore: {
    fontSize: 16,
    color: "#007BFF",
  },
});
export default PlayerGrid;
