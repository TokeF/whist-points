import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import store from "../store/store";
import { Provider } from "react-redux";

export default function Layout() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(screens)/SelectNames" />
          <Stack.Screen name="(screens)/SelectStrategy" />
        </Stack>
      </SafeAreaProvider>
    </Provider>
  );
}
