import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Platform,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";

export default function CreateButton() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/3d.jpg")} // Make sure this path is correct
        resizeMode="cover"
        style={styles.background}
      >
        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={styles.button}
            // onPress={() => router.push('/chat')}
          >
            <View style={styles.buttonInner}>
              <Text style={styles.buttonText}>Create</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  bottomSection: {
    position: "absolute",
    bottom:0, // Push down a little for perfect roundness
    left: 0,
    right: 0,
    width: "100%",
    height: 250, // Fixed height for clean semicircle
    backgroundColor: "#000",
    borderTopLeftRadius: 200,
    borderTopRightRadius: 200,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  button: {
    padding: 3,
    backgroundColor: "#000",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#fff",
  },
  buttonInner: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#000",
    borderRadius: 42,
    borderWidth: 1,
    borderColor: "#fff",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
