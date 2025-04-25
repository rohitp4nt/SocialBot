import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const Chat: React.FC = () => {
  const [name, setName] = useState('');
  const [confirmName, setConfirmName] = useState('');
  const [message, setMessage] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>Hi, Aarav!</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.profileContainer}>
          <View style={styles.profileCircle} />
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Name"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
          />
          <View style={styles.inputDivider} />
          <TextInput
            style={styles.input}
            placeholder="Confirm Name"
            placeholderTextColor="#999"
            value={confirmName}
            onChangeText={setConfirmName}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.tryButton}
            onPress={() => {
              setName('James');
              setConfirmName('James');
            }}
          >
            <Text style={styles.tryButtonText}>Try</Text>
            <Text style={styles.tryButtonName}>James</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tryButton}
            onPress={() => {
              setName('Russel');
              setConfirmName('Rutherford');
            }}
          >
            <Text style={styles.tryButtonText}>Try</Text>
            <Text style={styles.tryButtonName}>Russel</Text>
            <Text style={styles.tryButtonName}>Rutherford</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tryButton}
            onPress={() => {
              setName('Franklin');
              setConfirmName('Alexander');
            }}
          >
            <Text style={styles.tryButtonText}>Try</Text>
            <Text style={styles.tryButtonName}>Franklin</Text>
            <Text style={styles.tryButtonName}>Alexander</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.messageInputContainer}>
          <TouchableOpacity style={styles.attachButton}>
            <Feather name="paperclip" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.searchButton}>
            <Feather name="search" size={20} color="#666" />
          </TouchableOpacity>

          <TextInput
            style={styles.messageInput}
            placeholder="Message..."
            placeholderTextColor="#999"
            value={message}
            onChangeText={setMessage}
          />

          <TouchableOpacity style={styles.sendButton}>
            <Feather name="plus" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginBottom: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
  },
  formContainer: {
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
  },
  input: {
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
    textAlign: 'center',
  },
  inputDivider: {
    height: 1,
    backgroundColor: '#ddd',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tryButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    width: '30%',
  },
  tryButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  tryButtonName: {
    fontSize: 14,
    color: '#666',
  },
  messageInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  attachButton: {
    marginRight: 10,
  },
  searchButton: {
    marginRight: 10,
  },
  messageInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  sendButton: {
    marginLeft: 10,
  },
});
