// MainApp.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import MapScreen from './Map';
import HelpScreen from './pages/Help';
import InboxScreen from './pages/Inbox';
import TripsScreen from './pages/Trips';
// Import Icons or any other components needed for your tab bar

const Tab = createBottomTabNavigator();

const MainApp = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'taxi' : 'ios-home-outline';
            } else if (route.name === 'Favorite') {
              iconName = focused ? 'ios-heart' : 'ios-heart-outline';
            }
            // ... other icons for other tabs
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#2962ff',
          tabBarInactiveTintColor: 'gray',
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
