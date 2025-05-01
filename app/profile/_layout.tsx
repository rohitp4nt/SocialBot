import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // If you're planning to use icons

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: false, 
        }}
      />
    </Stack>
  );
}
