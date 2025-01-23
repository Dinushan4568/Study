import React, { useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,ImageBackground,Alert,Switch,ScrollView,ActivityIndicator,SafeAreaView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const [darkMode, setDarkMode] = useState(false);
  const [searching, setSearching] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleTilePress = (tileName) => {
    Alert.alert(`You clicked on ${tileName}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={{
          uri: "https://cdn5.f-cdn.com/contestentries/1578585/21468461/5d62b49ac544b_thumb900.jpg"
        }}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={[styles.container, darkMode && styles.darkContainer]}>
          
          <View style={styles.searchArea}>
            <Text style={styles.title}>Home</Text>
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />

              <TextInput
                placeholder="Search here"
                style={styles.searchInput}
                onFocus={() => setSearching(true)}
                onBlur={() => setSearching(false)}
              />

              {searching && <ActivityIndicator size="small" color="#0000ff" style={styles.activity} />}
            </View>

            <View style={styles.switchContainer}>
              <Text style={styles.info}>Dark Mode</Text>
              <Switch value={darkMode} onValueChange={toggleDarkMode} />
            </View>

          </View>

          <ScrollView contentContainerStyle={styles.tilesArea} showsVerticalScrollIndicator={false}>
            {[
              { name: 'Usage', color: '#D26543', icon: 'stats-chart' },
              { name: 'Tips', color: '#D8BFD8', icon: 'image' },
              { name: 'Profile', color: '#FFB6C1', icon: 'person' },
              { name: 'Trash', color: '#E6E6FA', icon: 'trash' },
              { name: 'Support', color: '#98FB98', icon: 'chatbubble' },
              { name: 'Share', color: '#FFA07A', icon: 'share' },
              { name: 'Settings', color: '#B0C4DE', icon: 'settings' },
              { name: 'Feedback', color: '#F08080', icon: 'thumbs-up' },
              { name: 'Help', color: '#FFD700', icon: 'help-circle' },
            ].map((tile, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.gridButton, { backgroundColor: tile.color }]}
                onPress={() => handleTilePress(tile.name)}
              >
                <Ionicons name={tile.icon} size={30} color="black" />
                <Text style={styles.buttonText}>{tile.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.navBar}>
            <Ionicons name="home" size={24} color="black" />
            <Ionicons name="trash" size={24} color="black" />
            <Ionicons name="settings" size={24} color="black" />
            <Ionicons name="share" size={24} color="black" />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
  },
  darkContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginVertical: 10,
  },
  searchArea: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  activity: {
    marginLeft: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  info: {
    fontSize: 18,
    color: '#333',
    marginRight: 10,
  },
  tilesArea: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 25,
  },
  gridButton: {
    width: '45%',
    height: 125,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    marginTop: 10,
  },
});
