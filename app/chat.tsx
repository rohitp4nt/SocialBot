"use client"

import { useState } from "react"
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
} from "react-native"
import { Feather } from "@expo/vector-icons"

// Define types for message data
interface Message {
  text: string
  sender: "user" | "bot"
  id: string
}

const ChatBot = () => {
  const [message, setMessage] = useState<string>("")
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello, how can I assist you?", sender: "bot", id: "initial-msg" }
  ])
  const [name, setName] = useState<string>("")
  const [confirmName, setConfirmName] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Send message to backend and get response
  const sendMessage = async (): Promise<void> => {
    if (!message.trim() || isLoading) return
    
    const messageId = Date.now().toString()
    const newUserMessage: Message = { 
      text: message, 
      sender: "user", 
      id: `user-${messageId}` 
    }
    
    setMessages(prevMessages => [...prevMessages, newUserMessage])
    setMessage("")
    setIsLoading(true)

    try {
      // Send user message to the backend and get response
      const response = await fetch("http://192.168.1.8:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch from server")
      }

      const data = await response.json()
      const botReply: Message = { 
        text: data.reply, 
        sender: "bot", 
        id: `bot-${messageId}` 
      }

      // Update messages with bot response
      setMessages(prevMessages => [...prevMessages, botReply])
    } catch (error) {
      console.error("Error sending message:", error)
      Alert.alert(
        "Connection Error", 
        "There was an error connecting to the server. Please check your connection and try again."
      )
    } finally {
      setIsLoading(false)
    }
  }

  const trySuggestion = (suggestion: string) => {
    setMessage(suggestion)
    // Uncomment to automatically send the suggestion:
    // setTimeout(sendMessage, 100)
  }

  // Handle name submission
  const handleNameSubmit = () => {
    if (!name || !confirmName) {
      Alert.alert("Missing Information", "Please enter and confirm your name.")
      return
    }
    
    if (name !== confirmName) {
      Alert.alert("Name Mismatch", "The names you entered do not match. Please try again.")
      return
    }
    
    // Here you would typically send this to your backend
    console.log("Name submitted:", name)
    Alert.alert("Success", `Welcome, ${name}!`)
  }

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
          <View style={styles.profileImage} />

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
            data={messages}
            renderItem={({ item }) => (
              <View 
                style={[
                  styles.messageContainer, 
                  item.sender === "bot" ? styles.botMessage : styles.userMessage
                ]}
              >
                <Text
                  style={[
                    styles.messageText, 
                    item.sender === "bot" ? styles.botMessageText : styles.userMessageText
                  ]}
                >
                  {item.text}
                </Text>
              </View>
            )}
            keyExtractor={item => item.id}
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
            style={[styles.iconButton, !message.trim() && styles.disabledButton]} 
            onPress={sendMessage}
            disabled={!message.trim() || isLoading}
          >
            <Feather name="plus" size={20} color={message.trim() ? "#000" : "#999"} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

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
  messagesContainer: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 70, // Space for the message input
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
    backgroundColor: "#4CAF50",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  userMessageText: {
    color: "#fff",
  },
  botMessageText: {
    color: "#333",
  },
  suggestionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 10,
    width: "100%",
  },
  suggestionButton: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 60,
  },
  suggestionText: {
    textAlign: "center",
    fontSize: 14,
    color: "#333",
  },
  messageInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#f9f9f9",
  },
  iconButton: {
    padding: 10,
    marginHorizontal: 2,
  },
  messageInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    color: "#333",
    fontSize: 16,
  },
  disabledButton: {
    opacity: 0.5,
  },
})

export default ChatBot