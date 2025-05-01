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
import JobsView from '@/components/JobsView';

const WINDOW_WIDTH = Dimensions.get('window').width;
const COVER_HEIGHT = 180;
const PROFILE_IMAGE_SIZE = 80;

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<string>('Post');
  const [isProfileEnabled, setIsProfileEnabled] = useState<boolean>(true); // Start as enabled
  const tabs = ['Post', 'Replies', 'Media', 'Articles'];

  const toggleSwitch = () => {
    setIsProfileEnabled(previousState => !previousState);
    if (isProfileEnabled) { // Navigate when turning OFF (opposite logic)
      router.push('/profile/[id]');
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
          
          <View style={styles.profileInfo}>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>Elon Musk</Text>
              <Feather name="check-circle" size={20} color="#1DA1F2" />
            </View>
            <Text style={styles.username}>@elon_musk</Text>
          </View>
          
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.messageButton}>
              <Text style={styles.messageButtonText}>Message</Text>
            </TouchableOpacity>
            
            {/* Icon toggle switch with reversed logic */}
            <View style={styles.switchContainer}>
              {/* <Feather name="user" size={16} color={isProfileEnabled ? "#007bff" : "#707070"} style={styles.switchIcon} /> */}
              <Switch
                trackColor={{ false: '#d1d1d1', true: '#007bff' }}
                thumbColor={isProfileEnabled ? '#ffffff' : '#f4f3f4'}
                ios_backgroundColor="#d1d1d1"
                onValueChange={toggleSwitch}
                value={isProfileEnabled}
              />
            </View>
            
            <TouchableOpacity style={styles.moreButton}>
              <Text style={styles.moreButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.profileDetails}>
            <View style={styles.followStats}>
              <Text style={styles.followText}>
                <Text style={styles.followNumber}>729</Text> Following
              </Text>
              <Text style={styles.followText}>
                <Text style={styles.followNumber}>19M</Text> Followers
              </Text>
            </View>
            
            {/* Dashboard section matching the image */}
            <View style={styles.dashboardContainer}>
              <View style={styles.buttonRow}>
                <View style={styles.iconButton}>
                  <Feather name="target" size={20} color="#000" />
                  <Text style={styles.buttonText}>Workplace.</Text>
                </View>
                <View style={styles.iconButton}>
                  <Feather name="dollar-sign" size={20} color="#000" />
                  <Text style={styles.buttonText}>Networth</Text>
                </View>
              </View>
              
              <View style={styles.buttonRow}>
                <View style={styles.iconButton}>
                  <Feather name="credit-card" size={20} color="#000" />
                  <Text style={styles.buttonText}>Business</Text>
                </View>
                <View style={styles.iconButton}>
                  <Feather name="users" size={20} color="#000" />
                  <Text style={styles.buttonText}>Employees</Text>
                </View>
              </View>
              
              <View style={styles.dashboardButton}>
                <Text style={styles.dashboardText}>DashBoard</Text>
              </View>
              
              <View style={styles.stocksSection}>
                <Text style={styles.stocksHeader}>Stocks</Text>
                <View style={styles.stocksDivider} />
                
                <View style={styles.stocksContent}>
                  <View style={styles.incomeColumn}>
                    <Text style={styles.columnHeader}>Net Income</Text>
                    <Text style={styles.incomeValue}>200 Million $</Text>
                    <Text style={styles.incomeFrequency}>Monthly</Text>
                  </View>
                  
                  <View style={styles.brandsColumn}>
                    <Text style={styles.columnHeader}>Brands</Text>
                    <Image
                      source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png' }}
                      style={styles.brandLogo}
                    />
                    <Text style={styles.brandName}>Tesla</Text>
                    <Text style={styles.stockInfo}>260.54 USD (+8.75 (2.86%))</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
         
          <View style={{ marginTop: 60, marginBottom: 80 }}>
      <JobsView />
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
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingLeft: 8,
    paddingRight: 2,
    height: 36,
  },
  switchIcon: {
    marginRight: 4,
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
  profileDetails: {
    paddingHorizontal: 16,
    marginTop: 4,
  },
  followStats: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 12,
    marginBottom: 16,
  },
  followText: {
    fontSize: 15,
    color: '#687684',
  },
  followNumber: {
    color: '#000',
    fontWeight: '600',
  },
  // Dashboard styles matching the image
  dashboardContainer: {
    marginTop: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 12,
    width: '48%',
    gap: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  dashboardButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  dashboardText: {
    fontSize: 16,
    fontWeight: '600',
  },
  stocksSection: {
    marginTop: 4,
  },
  stocksHeader: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  stocksDivider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 8,
  },
  stocksContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  incomeColumn: {
    flex: 1,
    alignItems: 'center',
  },
  brandsColumn: {
    flex: 1,
    alignItems: 'center',
  },
  columnHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  incomeValue: {
    fontSize: 15,
    fontWeight: '600',
  },
  incomeFrequency: {
    fontSize: 13,
    color: '#687684',
    marginTop: 4,
  },
  brandLogo: {
    width: 40,
    height: 40,
    backgroundColor: 'red',
    borderRadius: 8,
    marginBottom: 6,
  },
  brandName: {
    fontSize: 15,
    fontWeight: '600',
  },
  stockInfo: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 2,
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
    left: '25%',
    right: '25%',
    height: 2,
    backgroundColor: '#1DA1F2',
    width: '50%',
  },
  activeTab: {
    backgroundColor: 'transparent',
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
});