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
  Switch,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import PostGrid from '@/components/PostGrid';

const WINDOW_WIDTH = Dimensions.get('window').width;
const COVER_HEIGHT = 180;
const PROFILE_IMAGE_SIZE = 80;

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<string>('Post');
  const [isProfileSwitchOn, setIsProfileSwitchOn] = useState(false);
  const tabs = ['Post', 'Replies', 'Media', 'Articles'];

  const stats: { value: string; icon: 'bar-chart-2' | 'heart' | 'trending-up' }[] = [
    { value: '394M', icon: 'bar-chart-2' },
    { value: '72M', icon: 'heart' },
    { value: '194', icon: 'trending-up' },
  ];

  const dummyPosts = [
    { id: '1', image: 'https://source.unsplash.com/random/300x300?1' },
    { id: '2', image: 'https://source.unsplash.com/random/300x300?2' },
    { id: '3', image: 'https://source.unsplash.com/random/300x300?3' },
    { id: '4', image: 'https://source.unsplash.com/random/300x300?4' },
    { id: '5', image: 'https://source.unsplash.com/random/300x300?5' },
    { id: '6', image: 'https://source.unsplash.com/random/300x300?5' },
  ];
  // Handle switch toggle
  const toggleProfileSwitch = (value: boolean) => {
    setIsProfileSwitchOn(value);
    if (value) {
      router.push('/profes');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.scrollView} bounces={false}>
        <Image
          source={{
            uri: 'https://akm-img-a-in.tosshub.com/businesstoday/images/story/202410/6722eefa7f189-elon-musk-compound-for-children-301642393-16x9.jpg?size=948:533',
          }}
          style={styles.coverImage}
        />

        <View style={styles.content}>
          <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/USAFA_Hosts_Elon_Musk_%28Image_1_of_17%29_%28cropped%29.jpg',
            }}
            style={styles.profilePicture}
          />
           <View style={styles.nameContainer}>
              <Text style={styles.name}>Elon Musk</Text>
              <Feather name="check-circle" size={20} color="#1DA1F2" />
            </View>
            <Text style={styles.username}>@elon_musk</Text>
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.messageButton}>
              <Text style={styles.messageButtonText}>Message</Text>
            </TouchableOpacity>
            
            {/* Replace button with switch */}
            <View style={styles.switchContainer}>
              {/* <Text style={styles.switchLabel}>Profile 2</Text> */}
              <Switch
                value={isProfileSwitchOn}
                onValueChange={toggleProfileSwitch}
                trackColor={{ false: '#d3d3d3', true: '#007bff' }}
                thumbColor={isProfileSwitchOn ? '#ffffff' : '#f4f3f4'}
              />
            </View>
            
            <TouchableOpacity style={styles.moreButton}>
              <Text style={styles.moreButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.profileInfo}>
            <View style={styles.followStats}>
              <Text style={styles.followText}>
                <Text style={styles.followNumber}>729</Text> Following
              </Text>
              <Text style={styles.followText}>
                <Text style={styles.followNumber}>19M</Text> Followers
              </Text>
            </View>

            <View style={styles.analytics}>
              {stats.map((stat, index) => (
                <View key={index} style={styles.analyticItem}>
                  <Text style={styles.analyticValue}>{stat.value}</Text>
                  <Feather name={stat.icon} size={16} color="#687684" />
                </View>
              ))}
            </View>

            <Text style={styles.bio}>
              Elon Reeve Musk is a businessman and investor, CEO of Tesla, CTO of SpaceX,
              Chairman of Neuralink, and founder of The Boring Company.
            </Text>

            <View style={styles.joinDate}>
              <Feather name="calendar" size={16} color="#687684" />
              <Text style={styles.joinDateText}>28 June 1971</Text>
            </View>
          </View>

          <View style={styles.tabsContainer}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, activeTab === tab && styles.activeTab]}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={[styles.tabText, activeTab === tab && styles.activeTabText]}
                >
                  {tab}
                </Text>
                {activeTab === tab && <View style={styles.activeTabIndicator} />}
              </TouchableOpacity>
            ))}
          </View>
          <PostGrid posts={dummyPosts} />
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
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 8,
    paddingVertical: 8,
    marginLeft: 16,
    alignItems: 'center',
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
  // New switch styles
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  switchLabel: {
    marginRight: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
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
    paddingLeft: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 15,
    color: '#687684',
    marginTop: 1,
    paddingLeft: 10,
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
  activeTab: {
    backgroundColor: '#f0f0f0',
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