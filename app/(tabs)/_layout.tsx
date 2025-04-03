import { Tabs } from "expo-router";
import { Provider } from "react-redux";
import store from "../../store/store";
import FontAwesome from "@expo/vector-icons/build/FontAwesome";
import Colors from "../styles/Colors";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";
import { FontAwesome5 } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.tabBarActiveTintColor,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.backgroundLight,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="SelectNames"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="SelectStrategy"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="GameHistory"
        options={{
          title: "Game History",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 size={28} name="history" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="GameScreen"
        options={{
          title: "Game",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              size={28}
              name="cards-playing-club-multiple-outline"
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
