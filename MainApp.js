// MainApp.js
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import MapScreen from './Map';
import HelpScreen from './pages/Help';
import InboxScreen from './pages/Inbox';
import TripsScreen from './pages/Trips';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const MainApp = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    navigation.navigate('Login'); 
  };
 /*
  const handleLogout = async () => {
    try {
      const driverId = await AsyncStorage.getItem('driverId');
      if (!driverId) {
        console.error('Driver ID not found in AsyncStorage');
        return;
      }
  
      const response = await fetch('https://api-focnoae3da-uc.a.run.app/api/logout-driver', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          driverId: driverId,
        }),
      });
  
      const data = await response.json();
  
      if (response.status === 200) {
        console.log('Logout successful:', data.message);
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('driverId');
        navigation.navigate('Login');
      } else {
        console.error('Logout failed:', data.message);
      }
    } catch (error) {
      console.error('Network or server error:', error);
    }
  };
  */


  return (
    <Tab.Navigator
      initialRouteName="Map" 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Map':
              iconName = focused ? 'map' : 'map-outline';
              break;
            case 'Inbox':
              iconName = focused ? 'mail' : 'mail-outline';
              break;
            case 'Trips':
              iconName = focused ? 'car' : 'car-outline';
              break;
            case 'Help':
              iconName = focused ? 'help-circle' : 'help-circle-outline';
              break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2962ff',
        tabBarInactiveTintColor: 'gray',
        headerLeft: () => (
          <TouchableOpacity onPress={handleLogout} style={{ marginLeft: 10 }}>
            <Ionicons name="log-out-outline" size={30} color="#2962ff" />
          </TouchableOpacity>
        ),
      })}
    >
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Inbox" component={InboxScreen} />
      <Tab.Screen name="Trips" component={TripsScreen} />
      <Tab.Screen name="Help" component={HelpScreen} />
    </Tab.Navigator>
  );
};

export default MainApp;
