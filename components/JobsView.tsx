// components/JobsView.js

import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

// Example data (you can also pass these later as props if you want to)
const companies = [
  {
    name: 'SpaceX',
    location: 'Hawthorne, California',
    time: '1 hour ago',
    icon: 'https://www.redhotcyber.com/wp-content/uploads/2022/06/spacex-logo-free.jpg'
  },
  {
    name: 'Tesla',
    location: 'Austin, Texas',
    time: '7 hours ago',
    icon: 'https://media.designrush.com/inspiration_images/269905/conversions/1_Tesla_Logo_Design_31692375c0d0-desktop.jpg'
  },
  {
    name: 'Neuralink',
    location: 'Fremont, California', 
    time: '2 weeks ago',
    icon: 'https://patient9.com/wp-content/uploads/2024/04/Neuralink-Brain-Implant-Medical-Device.jpg'
  }
];

const networks = [
  'https://c.ndtvimg.com/2024-11/irdt2pa_elon-musk-reuters_625x300_27_November_24.jpeg?downsize=773:435',
  'https://cdn.britannica.com/37/255737-050-9BB3FEDA/Christopher-Nolan-Movie-film-director-Oppenheimer-UK-premiere-2023.jpg',
  'https://variety.com/wp-content/uploads/2023/11/homelander.jpg?w=1000&h=563&crop=1&resize=910%2C511',
  'https://hips.hearstapps.com/hmg-prod/images/claudia-doumit-2024-1272-66984a4c1375b.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*',
];

const categories = [
  ['Product', 'Brands', 'Business', 'Assets'],
  ['Patents', 'Models', 'Portfolio', 'Events']
];

const JobsView = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <Text style={styles.header}>View Job's</Text>

        {/* Companies */}
        <View style={styles.companiesList}>
          {companies.map((company, index) => (
            <TouchableOpacity key={index} style={styles.companyItem}>
              <Image source={{ uri: company.icon }} style={styles.companyIcon} />
              <View style={styles.companyInfo}>
                <Text style={styles.companyName}>{company.name}</Text>
                <Text style={styles.companyLocation}>{company.location}</Text>
              </View>
              <Text style={styles.timeStamp}>{company.time}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Networks */}
        <Text style={styles.sectionTitle}>Networks</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.networksScroll}
        >
          {networks.map((image, index) => (
            <Image key={index} source={{ uri: image }} style={styles.networkImage} />
          ))}
        </ScrollView>

        {/* Categories */}
        {categories.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.categoryRow}>
            {row.map((category, index) => (
              <TouchableOpacity key={index} style={styles.categoryItem}>
                <Text style={styles.categoryText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default JobsView;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
    textAlign: 'center',
  },
  companiesList: {
    paddingHorizontal: 16,
  },
  companyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#f1f1f1',
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  companyIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  companyInfo: {
    flex: 1,
    marginLeft: 12,
  },
  companyName: {
    fontSize: 16,
    fontWeight: '600',
  },
  companyLocation: {
    fontSize: 14,
    color: '#666',
  },
  timeStamp: {
    fontSize: 12,
    color: '#999',
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    padding: 16,
    textAlign: 'center',
  },
  networksScroll: {
    paddingLeft: 16,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  networkImage: {
    width: 70,
    height: 90,
    borderRadius: 15,
    marginRight: 10,
  },
  categoryRow: {
    flexDirection: 'row',
    marginTop: 20,
    paddingHorizontal: 16,
  },
  categoryItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
  },
  categoryText: {
    fontSize: 14,
  },
});
