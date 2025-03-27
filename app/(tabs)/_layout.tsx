import { Tabs } from "expo-router";
import { Provider } from "react-redux";
import store from "../store/store";

export default function TabsLayout() {
  return (
    // <Provider store={store}>
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue", headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="GameScreen"
        options={{
          title: "Game",
        }}
      />
    </Tabs>
    // </Provider>
  );
}
