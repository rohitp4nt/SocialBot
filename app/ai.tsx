import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Corrected chatbots array (no missing images)
const chatbots = [
  { id: "gemini-chat", icon: require("../assets/images/gem.jpg"), name: "Gemini" },
  { id: "2", icon: require("../assets/images/chatgpt.jpg"), name: "Claude" },
  { id: "3", icon: require("../assets/images/deepseek.png"), name: "Sail" },
  { id: "4", icon: require("../assets/images/bard.png"), name: "DevRev" }, // fallback image
  { id: "5", icon: require("../assets/images/openAI-chat-gpt-1.jpg"), name: "Copilot" }, // fallback image
];

const generative = [
  { id: 1, icon: require("../assets/images/canva.jpg"), name: "Canva" },
  { id: 2, icon: require("../assets/images/chatgpt.jpg"), name: "VEED.IO" },
  { id: 3, icon: require("../assets/images/chatgpt.jpg"), name: "ElevenLabs" },
  { id: 4, icon: require("../assets/images/chatgpt.jpg"), name: "Anthropic" }, // fallback
];

const productivity = [
  { id: 1, icon: require("../assets/images/chatgpt.jpg"), name: "Assistant 1" },
  { id: 2, icon: require("../assets/images/chatgpt.jpg"), name: "Assistant 2" },
  { id: 3, icon: require("../assets/images/chatgpt.jpg"), name: "Assistant 3" },
  { id: 4, icon: require("../assets/images/chatgpt.jpg"), name: "Assistant 4" },
  { id: 5, icon: require("../assets/images/chatgpt.jpg"), name: "Assistant 5" },
];

const assistant = [
  { id: 1, icon: require("../assets/images/chatgpt.jpg"), name: "DataComp" },
  { id: 2, icon: require("../assets/images/chatgpt.jpg"), name: "Assistant B" },
  { id: 3, icon: require("../assets/images/chatgpt.jpg"), name: "Lexica" },
];

export default function AiDirectoryScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Feather name="cpu" size={24} color="#000" />
        <Text style={styles.headerTitle}>A.i</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* ChatBots Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ChatBots</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.scrollContainer}
          >
            {chatbots.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.circleIcon}
                onPress={
                  item.id === "gemini-chat"
                    ? () => router.push("/chat")
                    : undefined
                }
                disabled={item.id !== "gemini-chat"}
              >
                <Image source={item.icon} style={styles.iconImage} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Generative Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Generative</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.scrollContainer}
          >
            {generative.map((item) => (
              <TouchableOpacity key={item.id} style={styles.rectangleIcon}>
                <Image source={item.icon} style={styles.rectangleImage} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Productivity Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Productivity</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.scrollContainer}
          >
            {productivity.map((item) => (
              <TouchableOpacity key={item.id} style={styles.circleIcon}>
                <Image source={item.icon} style={styles.iconImage} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Assistant Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Assistant</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.scrollContainer}
          >
            {assistant.map((item) => (
              <TouchableOpacity key={item.id} style={styles.circleIcon}>
                <Image source={item.icon} style={styles.iconImage} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 16,
    marginBottom: 12,
  },
  scrollContainer: {
    paddingLeft: 16,
  },
  circleIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 12,
    backgroundColor: "#f5f5f5",
    overflow: "hidden",
  },
  rectangleIcon: {
    width: 120,
    height: 60,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: "#f5f5f5",
    overflow: "hidden",
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  rectangleImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
