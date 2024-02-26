import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MapScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    let locationUpdateInterval;

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      updateLocation();

      locationUpdateInterval = setInterval(() => {
        updateLocation();
      }, 10000);
    })();

    return () => clearInterval(locationUpdateInterval);
  }, []);

  const updateLocation = async () => {
    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);
    updateDriverLocation(currentLocation.coords.latitude, currentLocation.coords.longitude);
  };
  const updateDriverLocation = async (latitude, longitude) => {
    try {
      const driverId = await AsyncStorage.getItem('driverId');
      
      console.log('Retrieved driverId from AsyncStorage:', driverId);
  
      if (!driverId) {
        console.error('No driverId found in AsyncStorage.');
        Alert.alert('Error', 'No driver ID found. Please login again.');
        return;
      }
  
      const response = await fetch(`http://192.168.1.93:3001/api/update-location/${driverId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude, 
          longitude, 
        }),
      });
      
      console.log('Attempting to update location for driverId:', driverId);
  
      if (!response.ok) {
        throw new Error(`Network response was not ok (status: ${response.status})`);
      }
  
      console.log('Location updated successfully for driverId:', driverId);
    } catch (error) {
      console.error('Update location error:', error);
      Alert.alert('Location Update Failed', `Unable to update driver location. Error: ${error.message}`);
    }
  };

  const markDriverActive = async () => {
    try {
      const driverId = await AsyncStorage.getItem('driverId');
      if (!driverId) {
        Alert.alert("Error", "Driver ID not found. Please log in.");
        return;
      }

      const response = await fetch(`http://192.168.1.93:3001/api/mark-active/${driverId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',

        },
      });

      if (!response.ok) {
        throw new Error("Failed to mark driver as active.");
      }

      const data = await response.json();
      Alert.alert("Success", "You are now marked as active.");
    } catch (error) {
      console.error("Error marking driver active:", error);
      Alert.alert("Error", "Could not mark driver as active. Please try again.");
    }
  };
  
  

  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.menuButton}>
        <Ionicons name="menu" size={30} color="#000" />
      </TouchableOpacity>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Your Location"
          />
        </MapView>
      ) : (
        <Text>{errorMsg || "Requesting location..."}</Text>
      )}
      <TouchableOpacity onPress={markDriverActive} style={[styles.actionButton, { backgroundColor: 'green' }]}>
        <Text style={{ color: '#fff' }}>Börja Arbeta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    backgroundColor: '#808080',
    padding: 10,
  },
  actionButton: {
    position: 'absolute',
    padding: 10,
    zIndex: 1,
    bottom: 20,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});