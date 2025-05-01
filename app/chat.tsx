"use client";

import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const GEMINI_API_KEY = "AIzaSyAnvYBFHRJgW1PXH0zb6-APeaCo099r_e8";
const GEMINI_BASE_URL = "https://generativelanguage.googleapis.com";
const GEMINI_MODEL = "gemini-1.5-flash-latest";

interface Message {
  text: string;
  sender: "user" | "bot";
  id: string;
}

const ChatBot = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello, how can I assist you?", sender: "bot", id: "initial-msg" },
  ]);
  const [name, setName] = useState<string>("");
  const [confirmName, setConfirmName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendMessage = async (): Promise<void> => {
    if (!message.trim() || isLoading) return;

    const userMessageText = message;
    const messageId = Date.now().toString();
    const newUserMessage: Message = {
      text: userMessageText,
      sender: "user",
      id: `user-${messageId}`,
    };

    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setMessage("");
    setIsLoading(true);

    const apiUrl = `${GEMINI_BASE_URL}/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: userMessageText }],
            },
          ],
        }),
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (e) {}
        throw new Error(
          `Failed to fetch from Gemini API: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      const botReplyText =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't get a response.";

      const botReply: Message = {
        text: botReplyText,
        sender: "bot",
        id: `bot-${messageId}`,
      };

      setMessages((prevMessages) => [
        ...prevMessages.filter((msg) => msg.id !== "loading-msg"),
        botReply,
      ]);
    } catch (error) {
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== "loading-msg")
      );
      Alert.alert(
        "Connection Error",
        `There was an error connecting to the Gemini API. Please check your connection and API key. Details: ${
          (error as Error).message
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const trySuggestion = (suggestion: string) => {
    setMessage(suggestion);
  };

  const handleNameSubmit = () => {
    if (!name || !confirmName) {
      Alert.alert("Missing Information", "Please enter and confirm your name.");
      return;
    }

    if (name !== confirmName) {
      Alert.alert(
        "Name Mismatch",
        "The names you entered do not match. Please try again."
      );
      return;
    }

    Alert.alert("Success", `Welcome, ${name}!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>Hi, Aarav!</Text>
          <View style={styles.headerUnderline} />
        </View>

        <View style={styles.profileSection}>
          <Image
            source={{ uri: "https://freesvg.org/img/1538298822.png" }} // <-- your image URL
            style={styles.profileImage}
          />
          <View style={styles.inputsContainer}>
            <TextInput
              style={styles.nameInput}
              value={name}
              onChangeText={setName}
              placeholder="Enter Name"
              placeholderTextColor="#999"
              returnKeyType="next"
            />
            <View style={styles.inputDivider} />
            <TextInput
              style={styles.nameInput}
              value={confirmName}
              onChangeText={setConfirmName}
              placeholder="Confirm Name"
              placeholderTextColor="#999"
              returnKeyType="done"
              onSubmitEditing={handleNameSubmit}
            />
          </View>
        </View>

        <View style={styles.suggestionsContainer}>
          <TouchableOpacity
            style={styles.suggestionButton}
            onPress={() => trySuggestion("Try James")}
          >
            <Text style={styles.suggestionText}>Try{"\n"}James</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.suggestionButton}
            onPress={() => trySuggestion("Try Russel Rutherford")}
          >
            <Text style={styles.suggestionText}>
              Try{"\n"}Russel{"\n"}Rutherford
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.suggestionButton}
            onPress={() => trySuggestion("Try Franklin Alexander")}
          >
            <Text style={styles.suggestionText}>
              Try{"\n"}Franklin{"\n"}Alexander
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.messagesContainer}>
          <FlatList
            data={
              isLoading
                ? [
                    ...messages,
                    { text: "...", sender: "bot", id: "loading-msg" },
                  ]
                : messages
            }
            renderItem={({ item }) => {
              if (item.id === "loading-msg") {
                return (
                  <View
                    style={[
                      styles.messageContainer,
                      styles.botMessage,
                      styles.loadingIndicator,
                    ]}
                  >
                    <ActivityIndicator size="small" color="#333" />
                  </View>
                );
              }
              return (
                <View
                  style={[
                    styles.messageContainer,
                    item.sender === "bot"
                      ? styles.botMessage
                      : styles.userMessage,
                  ]}
                >
                  <Text
                    style={[
                      styles.messageText,
                      item.sender === "bot"
                        ? styles.botMessageText
                        : styles.userMessageText,
                    ]}
                  >
                    {item.text}
                  </Text>
                </View>
              );
            }}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.messagesList}
            inverted={false}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View style={styles.messageInputContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="paperclip" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton}>
            <Feather name="search" size={20} color="#999" />
          </TouchableOpacity>

          <TextInput
            style={styles.messageInput}
            value={message}
            onChangeText={setMessage}
            placeholder="Message..."
            placeholderTextColor="#999"
            returnKeyType="send"
            onSubmitEditing={sendMessage}
            editable={!isLoading}
          />

          <TouchableOpacity
            style={[
              styles.iconButton,
              !message.trim() && styles.disabledButton,
            ]}
            onPress={sendMessage}
            disabled={!message.trim() || isLoading}
          >
            <Feather
              name="plus"
              size={20}
              color={message.trim() ? "#000" : "#999"}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  headerUnderline: {
    height: 1,
    backgroundColor: "#000",
    width: 100,
    marginTop: 5,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f0f0f0",
    marginBottom: 20,
  },
  inputsContainer: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  nameInput: {
    height: 50,
    paddingHorizontal: 15,
    textAlign: "center",
    color: "#333",
    fontSize: 16,
  },
  inputDivider: {
    height: 1,
    backgroundColor: "#ddd",
  },
  suggestionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  suggestionButton: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
  },
  suggestionText: {
    textAlign: "center",
    fontSize: 14,
    color: "#333",
  },
  messagesContainer: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 70,
  },
  messagesList: {
    paddingVertical: 10,
  },
  messageContainer: {
    maxWidth: "80%",
    padding: 12,
    marginVertical: 5,
    borderRadius: 15,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#000",
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#f0f0f0",
  },
  messageText: {
    fontSize: 16,
  },
  userMessageText: {
    color: "#fff",
  },
  botMessageText: {
    color: "#000",
  },
  messageInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    paddingVertical: 8,
  },
  iconButton: {
    padding: 8,
  },
  messageInput: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    color: "#000",
  },
  disabledButton: {
    opacity: 0.5,
  },
  loadingIndicator: {
    alignItems: "center",
  },
});

export default ChatBot;
