// DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainApp from '../MainApp'; // This should eventually lead to MapScreen being rendered.

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={MainApp} />
      {/* other screens */}
    </Drawer.Navigator>
  );
}
