import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const WINDOW_WIDTH = Dimensions.get('window').width;
const COVER_HEIGHT = 180;
const PROFILE_IMAGE_SIZE = 80;

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState('Post');
  const tabs = ['Post', 'Replies', 'Media', 'Articles'];

  const stats = [
    { value: '394M', icon: 'bar-chart-2' },
    { value: '72M', icon: 'heart' },
    { value: '194', icon: 'trending-up' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <ScrollView style={styles.scrollView} bounces={false}>
        {/* Cover Image */}
        <Image
          source={{ uri: '/placeholder.svg?height=180&width=400' }}
          style={styles.coverImage}
        />
        
        <View style={styles.content}>
          {/* Profile Picture */}
          <Image
            source={{ uri: '/placeholder.svg?height=80&width=80' }}
            style={styles.profilePicture}
          />

          {/* Action Buttons */}
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.messageButton}>
              <Text style={styles.messageButtonText}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreButton}>
              <Text style={styles.moreButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          {/* Profile Info */}
          <View style={styles.profileInfo}>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>Elon Musk</Text>
              <Feather name="check-circle" size={20} color="#1DA1F2" />
            </View>
            <Text style={styles.username}>@elon_musk</Text>

            {/* Following Stats */}
            <View style={styles.followStats}>
              <Text style={styles.followText}>
                <Text style={styles.followNumber}>729</Text> Following
              </Text>
              <Text style={styles.followText}>
                <Text style={styles.followNumber}>19M</Text> Followers
              </Text>
            </View>

            {/* Analytics */}
            <View style={styles.analytics}>
              {stats.map((stat, index) => (
                <View key={index} style={styles.analyticItem}>
                  <Text style={styles.analyticValue}>{stat.value}</Text>
                  <Feather name={stat.icon} size={16} color="#687684" />
                </View>
              ))}
            </View>

            {/* Bio */}
            <Text style={styles.bio}>
              Elon reeve musk is businessman and investor and CEO of tesla, CTO of spaceX, Chairman of Neuralink, Boring Company and Technical Engineer.
            </Text>

            {/* Join Date */}
            <View style={styles.joinDate}>
              <Feather name="calendar" size={16} color="#687684" />
              <Text style={styles.joinDateText}>28 June 1971</Text>
            </View>
          </View>

          {/* Tabs */}
          <View style={styles.tabsContainer}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, activeTab === tab && styles.activeTab]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                  {tab}
                </Text>
                {activeTab === tab && <View style={styles.activeTabIndicator} />}
              </TouchableOpacity>
            ))}
          </View>

          {/* Dashboard Quick Actions */}
          <View style={styles.quickActions}>
            <View style={styles.quickActionRow}>
              <TouchableOpacity style={styles.quickActionButton}>
                <Feather name="search" size={24} color="#000" />
                <Text style={styles.quickActionText}>Workplace</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickActionButton}>
                <Feather name="dollar-sign" size={24} color="#000" />
                <Text style={styles.quickActionText}>Networth</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.quickActionRow}>
              <TouchableOpacity style={styles.quickActionButton}>
                <Feather name="credit-card" size={24} color="#000" />
                <Text style={styles.quickActionText}>Business</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickActionButton}>
                <Feather name="users" size={24} color="#000" />
                <Text style={styles.quickActionText}>Employees</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Dashboard Section */}
          <View style={styles.dashboardSection}>
            <Text style={styles.sectionTitle}>DashBoard</Text>
          </View>

          {/* Stocks Section */}
          <View style={styles.stocksSection}>
            <Text style={styles.sectionTitle}>Stocks</Text>
            <View style={styles.stocksContainer}>
              <View style={styles.stockColumn}>
                <Text style={styles.stockLabel}>Net Income</Text>
                <Text style={styles.stockValue}>200 Million $</Text>
                <Text style={styles.stockPeriod}>Monthly</Text>
              </View>
              <View style={styles.stockDivider} />
              <View style={styles.stockColumn}>
                <Text style={styles.stockLabel}>Brands</Text>
                <Image
                  source={{ uri: '/placeholder.svg?height=40&width=40' }}
                  style={styles.brandLogo}
                />
                <Text style={styles.brandName}>Tesla</Text>
                <Text style={styles.stockChange}>+4.34 (2.45%)</Text>
              </View>
            </View>
          </View>

          {/* Content Placeholders */}
          <View style={styles.placeholders}>
            {[1, 2, 3].map((item) => (
              <View key={item} style={styles.placeholder} />
            ))}
          </View>
        </View>
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
  coverImage: {
    width: WINDOW_WIDTH,
    height: COVER_HEIGHT,
    backgroundColor: '#333',
  },
  content: {
    flex: 1,
  },
  profilePicture: {
    width: PROFILE_IMAGE_SIZE,
    height: PROFILE_IMAGE_SIZE,
    borderRadius: PROFILE_IMAGE_SIZE / 2,
    borderWidth: 4,
    borderColor: '#fff',
    marginTop: -PROFILE_IMAGE_SIZE / 2,
    marginLeft: 16,
  },
  actionButtonsContainer: {
    // flexDirection: 'row',
    // justifyContent: 'flex-end',
    // gap: 8,
    // paddingHorizontal: 16,
    // marginTop: -30,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 8,
    paddingVertical: 8,
     marginLeft: 16, 
  },
  followButton: {
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  followButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  messageButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  messageButtonText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 14,
  },
  moreButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreButtonText: {
    fontSize: 20,
    color: '#000',
    marginTop: -2,
  },
  profileInfo: {
    paddingHorizontal: 16,
    marginTop: 12,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 15,
    color: '#687684',
    marginTop: 1,
  },
  followStats: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 12,
  },
  followText: {
    fontSize: 15,
    color: '#687684',
  },
  followNumber: {
    color: '#000',
    fontWeight: '600',
  },
  analytics: {
    flexDirection: 'row',
    gap: 24,
    marginTop: 12,
  },
  analyticItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  analyticValue: {
    fontSize: 15,
    color: '#000',
  },
  bio: {
    fontSize: 15,
    lineHeight: 20,
    marginTop: 12,
    color: '#000',
  },
  joinDate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 12,
  },
  joinDateText: {
    fontSize: 15,
    color: '#687684',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EFF3F4',
    marginTop: 16,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    position: 'relative',
    
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#687684',
  },
  activeTabText: {
    color: '#000',
  },
  activeTabIndicator: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'black',
  },
  placeholders: {
    padding: 16,
  },
  placeholder: {
    height: 120,
    backgroundColor: '#F7F7F7',
    marginBottom: 16,
    borderRadius: 8,
  },
  quickActions: {
    padding: 16,
    gap: 12,
  },
  quickActionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  quickActionText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  dashboardSection: {
    padding: 16,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  stocksSection: {
    padding: 16,
  },
  stocksContainer: {
    flexDirection: 'row',
    backgroundColor: '#f7f7f7',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
  },
  stockColumn: {
    flex: 1,
    alignItems: 'center',
  },
  stockDivider: {
    width: 1,
    backgroundColor: '#e5e5e5',
    marginHorizontal: 16,
  },
  stockLabel: {
    fontSize: 14,
    color: '#687684',
    marginBottom: 4,
  },
  stockValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  stockPeriod: {
    fontSize: 12,
    color: '#687684',
    marginTop: 4,
  },
  brandLogo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginVertical: 8,
  },
  brandName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  stockChange: {
    fontSize: 14,
    color: '#4CAF50',
    marginTop: 4,
  },
});

