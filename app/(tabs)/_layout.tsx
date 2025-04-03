import { Tabs } from "expo-router";
import { Provider } from "react-redux";
import store from "../../store/store";
import FontAwesome from "@expo/vector-icons/build/FontAwesome";
import Colors from "../styles/Colors";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";

export default function TabsLayout() {
  return (
    // <Provider store={store}>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.tabBarActiveTintColor,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
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
      <Tabs.Screen
        name="GameHistory"
        options={{
          title: "Game History",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="history" color={color} />
          ),
        }}
      />
    </Tabs>
    // </Provider>
  );
}
