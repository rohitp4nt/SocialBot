import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, Animated } from "react-native";
import { BlurView } from "expo-blur";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useTabBar } from "@/contexts/TabBarContext";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { translateY } = useTabBar();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: "absolute",
          overflow: "hidden",
          elevation: 0,
          height: 60,
          borderTopWidth: 0,
          backgroundColor: 'transparent',
          shadowColor: 'transparent',
          transform: [{ translateY: translateY }],
        },
        tabBarItemStyle: {
          height: 60,
          paddingVertical: 0,
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarInactiveTintColor: '#1A1A1A',
        tabBarBackground: () => (
          <BlurView
            intensity={90}
            style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(255, 255, 255, 0.8)' }]}
            tint="light"
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} weight="bold" />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name="magnifyingglass.circle.fill"
              color={color}
              weight="bold"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "Add",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="plus.circle.fill" color={color} weight="bold" />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="play.circle.fill" color={color} weight="bold" />
          ),
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: "Notification",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="bell.badge.circle" color={color} weight="bold" />
          ),
        }}
      />
    </Tabs>
  );
}
