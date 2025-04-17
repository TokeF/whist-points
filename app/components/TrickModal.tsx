import React from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { FontAwesome } from "@expo/vector-icons";
import { TrickAmounts } from "@/models/types";
import GlobalStyles from "../styles/GlobalStyles";
import { DropdownStyles } from "./BetDropdows";
import theme from "../styles/Theme";

const TrickModal = ({
  isVisible,
  trickAmount,
  setTrickAmount,
  onConfirm,
  onCancel,
}: {
  isVisible: boolean;
  trickAmount: number;
  setTrickAmount: (amount: number) => void;
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Trick Amount</Text>
          <SelectDropdown
            data={TrickAmounts}
            onSelect={(selectedItem) => setTrickAmount(selectedItem)}
            defaultValue={trickAmount}
            renderButton={(selectedItem, isOpened) => (
              <View style={styles.dropdownModalButtonStyle}>
                <Text style={DropdownStyles.dropdownButtonTxt}>
                  {selectedItem}
                </Text>
                <FontAwesome
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  style={DropdownStyles.dropdownButtonArrow}
                />
              </View>
            )}
            renderItem={(item, index, isSelected) => (
              <View
                style={{
                  ...DropdownStyles.dropdownItem,
                  ...(isSelected && {
                    backgroundColor: theme.colors.backgroundDark,
                  }),
                }}
              >
                <Text style={DropdownStyles.dropdownItemTxt}>{item}</Text>
              </View>
            )}
            dropdownStyle={DropdownStyles.dropdownMenu}
          />
          <View
            style={{ flexDirection: "row", marginTop: theme.spacing.medium }}
          >
            <TouchableOpacity
              style={[
                GlobalStyles.button,
                { flex: 1, margin: theme.spacing.small },
              ]}
              onPress={onConfirm}
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
  warningContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  warningText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
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
});

export default TrickModal;
