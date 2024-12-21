import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: false
        }}
      />
    </Stack>
  );
} 