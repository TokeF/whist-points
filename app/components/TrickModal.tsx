import React from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { FontAwesome } from "@expo/vector-icons";
import { TrickAmounts } from "@/models/types";
import GlobalStyles from "../styles/GlobalStyles";
import { DropdownStyles } from "./BetDropdows";
import Colors from "../styles/Colors";

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
                  ...(isSelected && { backgroundColor: Colors.backgroundDark }),
                }}
              >
                <Text style={DropdownStyles.dropdownItemTxt}>{item}</Text>
              </View>
            )}
            dropdownStyle={DropdownStyles.dropdownMenu}
          />
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <TouchableOpacity
              style={[GlobalStyles.button, { flex: 1, margin: 10 }]}
              onPress={onConfirm}
            >
              <Text style={{ textAlign: "center" }}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[GlobalStyles.button, { flex: 1, margin: 10 }]}
              onPress={onCancel}
            >
              <Text style={{ textAlign: "center" }}>Cancel</Text>
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
    backgroundColor: Colors.overlay,
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: Colors.white,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
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
    backgroundColor: Colors.backgroundLight,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    padding: 5,
  },
});

export default TrickModal;
