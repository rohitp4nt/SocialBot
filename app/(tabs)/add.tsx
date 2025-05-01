import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Platform,
  StatusBar,
  Animated,
  Easing,
} from "react-native";
import { useRouter } from "expo-router";

export default function CreateButton() {
  const router = useRouter();
  
  // Animation references
  const zoomAnimation = useRef(new Animated.Value(1)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Fade in the button
    Animated.timing(buttonOpacity, {
      toValue: 1,
      duration: 800,
      delay: 400,
      useNativeDriver: true,
    }).start();
    
    // Start the continuous zoom animation
    startZoomAnimation();
  }, []);
  
  // Function to handle continuous zooming effect
  const startZoomAnimation = () => {
    // Sequence of zoom in and out with different durations for a more dynamic feel
    Animated.loop(
      Animated.sequence([
        // Zoom in slowly
        Animated.timing(zoomAnimation, {
          toValue: 1.2,
          duration: 15000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        // Zoom out at medium speed
        Animated.timing(zoomAnimation, {
          toValue: 0.95,
          duration: 12000,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true,
        }),
        // Zoom in at medium speed
        Animated.timing(zoomAnimation, {
          toValue: 1.1,
          duration: 10000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        // Zoom out slowly to return to starting point
        Animated.timing(zoomAnimation, {
          toValue: 1,
          duration: 13000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();
  };
  
  // Handle button press with animation
  const handlePress = () => {
    // Create a scale animation for the button press effect
    const pressAnimation = new Animated.Value(1);
    
    Animated.sequence([
      Animated.timing(pressAnimation, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(pressAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Navigate after animation completes
      if (router && router.push) {
        router.push('/chat');
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Background with zoom effect */}
      <Animated.View 
        style={[
          styles.animatedBackground,
          {
            transform: [
              { scale: zoomAnimation }
            ]
          }
        ]}
      >
        <ImageBackground
          source={require("../../assets/images/3d.jpg")}
          resizeMode="cover"
          style={styles.background}
        />
      </Animated.View>
      
      {/* Bottom section with button */}
      <View style={styles.bottomSection}>
        <Animated.View style={{ opacity: buttonOpacity }}>
          <TouchableOpacity
            style={styles.button}
            onPress={handlePress}
            activeOpacity={0.8}
          >
            <View style={styles.buttonInner}>
              <Text style={styles.buttonText}>Create</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  animatedBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // Slightly larger to avoid seeing edges during zoom
    width: "110%", 
    height: "110%",
    marginLeft: "-5%",
    marginTop: "-5%",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  bottomSection: {
    position: "absolute",
    bottom: 0,
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
    
    // Add subtle shadow for better separation from background
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
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
    
    // Add subtle glow
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});