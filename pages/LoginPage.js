import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginPage({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const checkForCredentials = async () => {
      const token = await AsyncStorage.getItem('userToken');
      const driverId = await AsyncStorage.getItem('driverId');
      if (token && driverId) {
        navigation.navigate('MainApp');
      }
    };
  
    checkForCredentials();
  }, [navigation]);
  
  const handleLogin = async () => {
    if (username !== '' && password !== '') {
      try {
        const response = await fetch(
          'https://api-focnoae3da-uc.a.run.app/api/login/driver',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: username,
              password: password,
            }),
          },
        );
  
        const data = await response.json();
  
        if (response.status === 200) {
          await AsyncStorage.setItem('userToken', data.token);
          await AsyncStorage.setItem('driverId', data.driverId); 
          
          console.log('Driver ID:', data.driverId); 
        
          navigation.navigate('MainApp');
        } else {
          Alert.alert(
            'Login Failed',
            data.message || 'An error occurred during login',
          );
        }
      } catch (error) {
        console.error(error);
        Alert.alert(
          'Network Error',
          'Unable to connect to the server. Please try again later.',
        );
      }
    } else {
      Alert.alert(
        'Invalid Credentials',
        'Username and password cannot be empty.',
        [{ text: 'OK' }],
      );
    }
  };
  

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email" // Changed placeholder to Email
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Log In" onPress={handleLogin} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
});

export default LoginPage;
