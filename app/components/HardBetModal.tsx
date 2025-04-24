import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import GlobalStyles from "../styles/GlobalStyles";
import theme from "../styles/Theme";

const HardBetModal = ({
  isVisible,
  setHardBetWinners,
  onConfirm,
  onCancel,
  selectedPlayers,
}: {
  isVisible: boolean;
  setHardBetWinners: (winners: string[]) => void;
  onConfirm: () => void;
  onCancel: () => void;
  selectedPlayers: string[];
}) => {
  const [successfulPlayers, setSuccessfulPlayers] = useState<string[]>([]);

  useEffect(() => {
    // Reset successful players when the modal is closed
    if (!isVisible) {
      setSuccessfulPlayers([]);
    }
  }, [isVisible]);

  const togglePlayerSuccess = (player: string) => {
    setSuccessfulPlayers(
      (prev) =>
        prev.includes(player)
          ? prev.filter((p) => p !== player) // Remove player if already in the array
          : [...prev, player] // Add player if not in the array
    );
    setHardBetWinners(selectedPlayers);
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Tap players if successful</Text>

          <View style={styles.playersContainer}>
            {selectedPlayers.map((player, index) => (
              <TouchableOpacity
                key={index}
                style={styles.playerRow}
                onPress={() => togglePlayerSuccess(player)}
              >
                <Text style={styles.playerName}>{player}</Text>
                {successfulPlayers.includes(player) && (
                  <FontAwesome
                    name="check"
                    size={20}
                    color="grey"
                    style={styles.checkedIcon}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>

          <View
            style={{ flexDirection: "row", marginTop: theme.spacing.medium }}
          >
            <TouchableOpacity
              style={[
                GlobalStyles.button,
                { flex: 1, margin: theme.spacing.small },
              ]}
              onPress={() => {
                onConfirm();
              }}
            >
              <Text style={GlobalStyles.buttonText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                GlobalStyles.button,
                { flex: 1, margin: theme.spacing.small },
              ]}
              onPress={onCancel}
            >
              <Text style={GlobalStyles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.overlay,
  },
  modalContent: {
    width: "80%",
    padding: theme.spacing.large,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.medium,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: theme.fontSizes.medium,
    fontWeight: "bold",
    marginBottom: theme.spacing.medium,
    color: theme.colors.textPrimary,
  },
  dropdownModalButtonStyle: {
    backgroundColor: theme.colors.backgroundLight,
    borderRadius: theme.borderRadius.small,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: theme.spacing.medium,
    padding: theme.spacing.small,
  },
  playersContainer: {
    width: "100%",
    marginVertical: theme.spacing.medium,
  },
  playerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing.small,
  },
  playerName: {
    flex: 4, // 80% of the row space
    fontSize: theme.fontSizes.medium,
    color: theme.colors.textPrimary,
  },
  checkedIcon: {
    flex: 1, // Align with the 20% space for the icon
    textAlign: "right",
  },
});

export default HardBetModal;
