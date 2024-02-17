// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './pages/LoginPage';
import MainApp from './MainApp'; // Import the MainApp that contains your Tab.Navigator

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="MainApp" component={MainApp} options={{ headerShown: false }} />
        {/* ... any other screens that are part of the stack navigator ... */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
