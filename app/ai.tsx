import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const placeholderImage = 'https://via.placeholder.com/50';

const categories = [
  {
    title: 'ChatBots',
    items: [
      { id: 1, image: placeholderImage },
      { id: 2, image: placeholderImage },
      { id: 3, image: placeholderImage },
      { id: 4, image: placeholderImage },
      { id: 5, image: placeholderImage },
    ]
  },
  {
    title: 'Generative',
    items: [
      { id: 6, image: placeholderImage },
      { id: 7, image: placeholderImage },
      { id: 8, image: placeholderImage },
      { id: 9, image: placeholderImage },
    ]
  },
  {
    title: 'Productivity',
    items: [
      { id: 10, image: placeholderImage },
      { id: 11, image: placeholderImage },
      { id: 12, image: placeholderImage },
      { id: 13, image: placeholderImage },
    ]
  },
  {
    title: 'Assistant',
    items: [
      { id: 14, image: placeholderImage },
      { id: 15, image: placeholderImage },
      { id: 16, image: placeholderImage },
      { id: 17, image: placeholderImage },
    ]
  },
];

export default function AIScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {categories.map((category, index) => (
          <View key={index} style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{category.title}</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.itemsContainer}
            >
              {category.items.map((item) => (
                <Pressable
                  key={item.id}
                  style={({ pressed }) => [
                    styles.itemButton,
                    pressed && styles.pressed
                  ]}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={styles.itemImage}
                  />
                </Pressable>
              ))}
            </ScrollView>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  categoryContainer: {
    paddingVertical: 16,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '600',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  itemsContainer: {
    paddingHorizontal: 12,
  },
  itemButton: {
    marginHorizontal: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
}); 