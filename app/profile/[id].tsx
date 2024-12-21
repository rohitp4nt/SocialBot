import { StyleSheet, View, ScrollView, TouchableOpacity, Image, Dimensions } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function ProfileScreen() {
  const { id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState("Post");
  
  const tabs = ["Post", "Replies", "Media", "Articles"];
  const bottomTabs = ["Product", "Brands", "Business", "Assets", "Patents", "Models", "Portfolio", "Events"];

  const windowWidth = Dimensions.get('window').width;
  const coverHeight = 200;
  const profilePicSize = 100;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Cover Image */}
          <Image
            source={{ uri: "https://picsum.photos/800/400" }}
            style={[styles.coverImage, { height: coverHeight }]}
          />
          
          {/* Profile Picture */}
          <View style={styles.profilePictureContainer}>
            <Image
              source={{ uri: "https://picsum.photos/400/400" }}
              style={[styles.profilePicture, { width: profilePicSize, height: profilePicSize }]}
            />
          </View>

          {/* Profile Header */}
          <View style={styles.header}>
            <View style={styles.nameRow}>
              <ThemedText style={styles.name}>Elon Musk</ThemedText>
              <Ionicons name="checkmark-circle" size={20} color="#1DA1F2" />
            </View>
            <ThemedText style={styles.username}>@elon_musk</ThemedText>

            <ThemedText style={styles.bio}>
              Elon musk is businessman and investor and CEO of tesla, CTO of spaceX, Chairman of Neuralink, Boring Company and Technical Engineer.
            </ThemedText>

            <ThemedText style={styles.joinDate}>
              <Ionicons name="calendar-outline" size={14} color="#536471" /> 28 June 1971
            </ThemedText>

            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.followButton}>
                <ThemedText style={styles.followButtonText}>Follow</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.messageButton}>
                <ThemedText style={styles.messageButtonText}>Message</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.moreButton}>
                <Ionicons name="add" size={24} color="#1DA1F2" />
              </TouchableOpacity>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <ThemedText style={styles.statNumber}>729</ThemedText>
                <ThemedText style={styles.statLabel}>Following</ThemedText>
              </View>
              <View style={styles.stat}>
                <ThemedText style={styles.statNumber}>19M</ThemedText>
                <ThemedText style={styles.statLabel}>Followers</ThemedText>
              </View>
            </View>

            <View style={styles.analyticsRow}>
              <View style={styles.analyticItem}>
                <ThemedText style={styles.analyticValue}>394M</ThemedText>
                <Ionicons name="stats-chart-outline" size={20} color="#1DA1F2" />
              </View>
              <View style={styles.analyticItem}>
                <ThemedText style={styles.analyticValue}>72M</ThemedText>
                <Ionicons name="heart-outline" size={20} color="#1DA1F2" />
              </View>
              <View style={styles.analyticItem}>
                <ThemedText style={styles.analyticValue}>194</ThemedText>
                <Ionicons name="analytics-outline" size={20} color="#1DA1F2" />
              </View>
            </View>
          </View>

          {/* Main Tabs */}
          <View style={styles.mainTabs}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.mainTab, activeTab === tab && styles.activeMainTab]}
                onPress={() => setActiveTab(tab)}
              >
                <ThemedText style={[styles.mainTabText, activeTab === tab && styles.activeMainTabText]}>
                  {tab}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>

          {/* Posts Grid */}
          {activeTab === "Post" && (
            <View style={styles.postsGrid}>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Image
                  key={item}
                  source={{ uri: `https://picsum.photos/400/400?random=${item}` }}
                  style={[styles.postImage, { width: windowWidth / 3 - 2 }]}
                />
              ))}
            </View>
          )}

          {/* Dashboard Section */}
          <View style={styles.dashboardSection}>
            <ThemedText style={styles.sectionTitle}>DashBoard</ThemedText>
            <View style={styles.dashboardGrid}>
              <View style={styles.dashboardRow}>
                <TouchableOpacity style={styles.dashboardItem}>
                  <Ionicons name="briefcase-outline" size={24} color="#1DA1F2" />
                  <ThemedText style={styles.dashboardLabel}>Workplace</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dashboardItem}>
                  <Ionicons name="cash-outline" size={24} color="#1DA1F2" />
                  <ThemedText style={styles.dashboardLabel}>Networth</ThemedText>
                </TouchableOpacity>
              </View>
              <View style={styles.dashboardRow}>
                <TouchableOpacity style={styles.dashboardItem}>
                  <Ionicons name="business-outline" size={24} color="#1DA1F2" />
                  <ThemedText style={styles.dashboardLabel}>Business</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dashboardItem}>
                  <Ionicons name="people-outline" size={24} color="#1DA1F2" />
                  <ThemedText style={styles.dashboardLabel}>Employees</ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Stocks Section */}
          <View style={styles.stocksSection}>
            <ThemedText style={styles.sectionTitle}>Stocks</ThemedText>
            <View style={styles.stockInfo}>
              <View style={styles.stockColumn}>
                <ThemedText style={styles.stockLabel}>Net Income</ThemedText>
                <ThemedText style={styles.stockValue}>200 Million $</ThemedText>
                <ThemedText style={styles.stockPeriod}>Monthly</ThemedText>
              </View>
              <View style={styles.stockDivider} />
              <View style={styles.stockColumn}>
                <ThemedText style={styles.stockLabel}>Brands</ThemedText>
                <Image 
                  source={{ uri: "https://example.com/tesla.png" }}
                  style={styles.brandLogo}
                />
                <ThemedText style={styles.brandName}>Tesla</ThemedText>
                <ThemedText style={styles.stockChange}>+4.34 (2.45%)</ThemedText>
              </View>
            </View>
          </View>

          {/* Bottom Tabs */}
          <View style={styles.bottomTabsContainer}>
            <View style={styles.bottomTabsRow}>
              {bottomTabs.slice(0, 4).map((tab) => (
                <TouchableOpacity key={tab} style={styles.bottomTab}>
                  <ThemedText style={styles.bottomTabText}>{tab}</ThemedText>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.bottomTabsRow}>
              {bottomTabs.slice(4).map((tab) => (
                <TouchableOpacity key={tab} style={styles.bottomTab}>
                  <ThemedText style={styles.bottomTabText}>{tab}</ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </View>
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
  scrollView: {
    flex: 1,
  },
  coverImage: {
    width: '100%',
    resizeMode: 'cover',
  },
  profilePictureContainer: {
    paddingHorizontal: 16,
    marginTop: -50,
  },
  profilePicture: {
    borderRadius: 50,
    borderWidth: 4,
    borderColor: 'white',
  },
  header: {
    padding: 16,
    paddingTop: 0,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
  },
  username: {
    fontSize: 14,
    color: "#536471",
    marginTop: 4,
  },
  bio: {
    fontSize: 14,
    color: "#000",
    marginTop: 12,
    lineHeight: 20,
  },
  joinDate: {
    fontSize: 14,
    color: "#536471",
    marginTop: 12,
  },
  actionButtons: {
    flexDirection: "row",
    marginTop: 16,
    gap: 8,
  },
  followButton: {
    backgroundColor: "#1DA1F2",
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 16,
  },
  followButtonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 14,
  },
  messageButton: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1DA1F2",
  },
  messageButtonText: {
    color: "#1DA1F2",
    fontWeight: "500",
    fontSize: 14,
  },
  moreButton: {
    backgroundColor: "white",
    padding: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1DA1F2",
  },
  statsRow: {
    flexDirection: "row",
    marginTop: 16,
    gap: 20,
  },
  stat: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },
  statLabel: {
    fontSize: 13,
    color: "#536471",
  },
  analyticsRow: {
    flexDirection: "row",
    marginTop: 16,
    gap: 20,
  },
  analyticItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  analyticValue: {
    fontSize: 13,
    color: "#000",
  },
  mainTabs: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#EFF3F4",
    backgroundColor: "white",
  },
  mainTab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeMainTab: {
    borderBottomColor: "#1DA1F2",
  },
  mainTabText: {
    color: "#536471",
    fontWeight: "500",
  },
  activeMainTabText: {
    color: "#1DA1F2",
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 16,
  },
  dashboardSection: {
    padding: 16,
    backgroundColor: "white",
  },
  dashboardGrid: {
    gap: 12,
  },
  dashboardRow: {
    flexDirection: "row",
    gap: 12,
  },
  dashboardItem: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dashboardLabel: {
    marginTop: 8,
    fontSize: 14,
    color: "#536471",
  },
  stocksSection: {
    padding: 16,
    backgroundColor: "white",
  },
  stockInfo: {
    flexDirection: "row",
    backgroundColor: "#f8f8f8",
    padding: 16,
    borderRadius: 12,
  },
  stockColumn: {
    flex: 1,
    alignItems: "center",
  },
  stockDivider: {
    width: 1,
    backgroundColor: "#ddd",
    marginHorizontal: 16,
  },
  stockLabel: {
    fontSize: 13,
    color: "#666",
    marginBottom: 4,
  },
  stockValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  stockPeriod: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  brandLogo: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginVertical: 6,
  },
  brandName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  stockChange: {
    fontSize: 12,
    color: "#4CAF50",
    marginTop: 2,
  },
  bottomTabsContainer: {
    padding: 16,
    backgroundColor: "white",
  },
  bottomTabsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  bottomTab: {
    flex: 1,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 16,
    backgroundColor: "#f8f8f8",
    alignItems: "center",
  },
  bottomTabText: {
    fontSize: 13,
    color: "#333",
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
    padding: 2,
  },
  postImage: {
    aspectRatio: 1,
    resizeMode: 'cover',
  },
}); 