import { StyleSheet, View, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { router } from "expo-router";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const trendingHashtags = ["#millionairelifestyles", "#samaltman", "#openai"];
  
  const trendingProfiles = [
    { id: 1, name: "Elon musk", username: "@elon_musk", verified: true },
    { id: 2, name: "Riyansh agrawal", username: "@riymodel", verified: false },
    { id: 3, name: "Sofia Saffera", username: "@saffera_", verified: true },
    { id: 4, name: "Anna Ranells", username: "@_anna_ranell", verified: false },
    { id: 5, name: "Emilian Alisa", username: "@emilian_alisa", verified: true },
    { id: 6, name: "Bretton Alexander", username: "@bre_alex", verified: false },
  ];

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.searchInputWrapper}>
            <Ionicons 
              name="search" 
              size={20} 
              color="#8c9499"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#8c9499"
              value={searchQuery}
              onChangeText={handleSearch}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity 
                onPress={() => setSearchQuery("")}
                style={styles.clearButton}
              >
                <Ionicons 
                  name="close-circle" 
                  size={20} 
                  color="#8c9499"
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <ScrollView 
          style={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#60a5c2" />
            </View>
          ) : (
            <>
              <View style={styles.hashtagsContainer}>
                {trendingHashtags.map((hashtag) => (
                  <TouchableOpacity
                    key={hashtag}
                    style={styles.hashtagPill}
                  >
                    <ThemedText style={styles.hashtagText}>
                      {hashtag}
                    </ThemedText>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.trendingSection}>
                <ThemedText style={styles.sectionTitle}>
                  Trending
                </ThemedText>
                {trendingProfiles.map((profile) => (
                  <TouchableOpacity
                    key={profile.id}
                    style={styles.profileItem}
                    onPress={() => router.push(`/profile/${profile.id}`)}
                  >
                    <View style={styles.avatarPlaceholder}>
                      <Ionicons 
                        name="person" 
                        size={30} 
                        color="#8c9499"
                      />
                    </View>
                    <View style={styles.profileInfo}>
                      <View style={styles.nameContainer}>
                        <ThemedText style={styles.profileName}>
                          {profile.name}
                        </ThemedText>
                        {profile.verified && (
                          <Ionicons 
                            name="checkmark-circle" 
                            size={16} 
                            color="#60a5c2"
                            style={styles.verifiedIcon}
                          />
                        )}
                      </View>
                      <ThemedText style={styles.username}>
                        {profile.username}
                      </ThemedText>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  searchContainer: {
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  searchInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F3F5",
    borderRadius: 20,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#11181C",
  },
  clearButton: {
    marginLeft: 8,
  },
  content: {
    flex: 1,
    backgroundColor: "white",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  hashtagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 8,
  },
  hashtagPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "#F1F3F5",
  },
  hashtagText: {
    fontSize: 14,
    color: "#60a5c2",
  },
  trendingSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: "#11181C",
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F1F3F5",
    justifyContent: "center",
    alignItems: "center",
  },
  profileInfo: {
    marginLeft: 12,
    flex: 1,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    color: "#11181C",
  },
  username: {
    fontSize: 14,
    marginTop: 2,
    color: "#8c9499",
  },
  verifiedIcon: {
    marginLeft: 4,
  },
});

