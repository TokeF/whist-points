import { BetAmounts } from "@/models/types";
import { IStrategy } from "@/services/IPointStrategy";
import FontAwesome from "@expo/vector-icons/build/FontAwesome";
import { Text, View, StyleSheet } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import theme from "../styles/Theme";

interface BetDropdownProps {
  strategy: IStrategy;

  setSelectedBet: (bet: string) => void;
  setSelectedBetAmount: (betAmount: number) => void;
}

const BetDropdowns: React.FC<BetDropdownProps> = ({
  strategy,
  setSelectedBet,
  setSelectedBetAmount,
}) => {
  return (
    <View style={DropdownStyles.dropdownContainer}>
      {/* Numbers sropdown */}
      <View>
        <Text>Bet Amount</Text>
        <SelectDropdown
          data={BetAmounts}
          onSelect={(selectedItem) => setSelectedBetAmount(selectedItem)}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={DropdownStyles.dropdownButton}>
                {/* {selectedItem && (
            <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
          )} */}
                <Text style={DropdownStyles.dropdownButtonTxt}>
                  {selectedItem}
                </Text>
                <FontAwesome
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  style={DropdownStyles.dropdownButtonArrow}
                />
              </View>
            );
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View
                style={{
                  ...DropdownStyles.dropdownItem,
                  ...(isSelected && {
                    backgroundColor: theme.colors.backgroundDark,
                  }),
                }}
              >
                {/* <Icon name={item.icon} style={styles.dropdownItemIconStyle} /> */}
                <Text style={DropdownStyles.dropdownItemTxt}>{item}</Text>
              </View>
            );
          }}
          defaultValueByIndex={0}
          dropdownStyle={DropdownStyles.dropdownMenu}
        />
      </View>

      {/* Bet dropdown */}
      {Object.keys(strategy.bets).length > 0 && (
        <View>
          <Text>Bet Type</Text>
          <SelectDropdown
            data={Object.keys(strategy.bets)}
            onSelect={(selectedItem) => setSelectedBet(selectedItem)}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={DropdownStyles.dropdownButton}>
                  {/* {selectedItem && (
            <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
          )} */}
                  <Text style={DropdownStyles.dropdownButtonTxt}>
                    {selectedItem}
                  </Text>
                  <FontAwesome
                    name={isOpened ? "chevron-up" : "chevron-down"}
                    style={DropdownStyles.dropdownButtonArrow}
                  />
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View
                  style={{
                    ...DropdownStyles.dropdownItem,
                    ...(isSelected && {
                      backgroundColor: theme.colors.backgroundDark,
                    }),
                  }}
                >
                  {/* <Icon name={item.icon} style={styles.dropdownItemIconStyle} /> */}
                  <Text style={DropdownStyles.dropdownItemTxt}>{item}</Text>
                </View>
              );
            }}
            defaultValueByIndex={0}
            dropdownStyle={DropdownStyles.dropdownMenu}
          />
        </View>
      )}
    </View>
  );
};

export const DropdownStyles = StyleSheet.create({
  dropdownContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingBottom: 10,
  },
  dropdownMenu: {
    backgroundColor: theme.colors.backgroundLight,
    borderRadius: 8,
    flex: 1,
  },
  dropdownButton: {
    backgroundColor: theme.colors.backgroundLight,
    width: 150,
    height: 50,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    padding: 5,
  },
  dropdownButtonTxt: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: theme.colors.textPrimary,
  },
  dropdownButtonArrow: {
    fontSize: 14,
  },
  dropdownButtonIcon: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownItem: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxt: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: theme.colors.textPrimary,
  },
  dropdownItemIcon: {
    fontSize: 28,
    marginRight: 8,
  },
});

export default BetDropdowns;
