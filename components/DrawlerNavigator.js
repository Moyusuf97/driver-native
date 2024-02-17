import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainApp from '../MainApp'; // Assuming MainApp is the entry point to your bottom tabs

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={MainApp} />
      {/* Add other screens here if needed */}
    </Drawer.Navigator>
  );
};


export default DrawerNavigator;
