import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(screens)/index" />
        <Stack.Screen name="(screens)/GameSetup" />
        <Stack.Screen name="(screens)/GameScreen" />
      </Stack>
    </SafeAreaProvider>
  );
}
