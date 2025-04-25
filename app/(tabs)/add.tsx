import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';

export default function CreateButton() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/chat')} // Navigates to the /chat page
        >
          <View style={styles.buttonInner}>
            <Text style={styles.buttonText}>Create</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '28%',
    backgroundColor: '#000',
    borderTopLeftRadius: 130,
    borderTopRightRadius: 130,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 3,
    backgroundColor: '#000',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#fff',
    
  },
  buttonInner: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#000',
    borderRadius: 42,
    borderWidth: 1,
    borderColor: '#fff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});