import { Tabs } from "expo-router";
import theme from "../styles/Theme";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";
import { FontAwesome5 } from "@expo/vector-icons";
import { StatusBar } from "react-native";
import { useEffect } from "react";
import * as NavigationBar from "expo-navigation-bar";

export default function TabsLayout() {
  useEffect(() => {
    NavigationBar.setBackgroundColorAsync(theme.colors.backgroundLight);
  }, []);
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.backgroundLight}
        translucent={false}
      />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: theme.colors.tabBarActiveTintColor,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.colors.backgroundLight,
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
    </>
  );
}
