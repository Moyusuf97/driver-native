import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginPage({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const checkForTokenAndSession = async () => {
      const token = await AsyncStorage.getItem('userToken');
      const sessionActive = await AsyncStorage.getItem('sessionActive');
      if (token && sessionActive === 'true') {
        navigation.navigate('MainApp');
      }
    };

    checkForTokenAndSession();
  }, [navigation]);

  const handleLogin = async () => {
    if (username !== '' && password !== '') {
      try {
        const response = await fetch('https://api-focnoae3da-uc.a.run.app/api/login/driver', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: username,
            password: password,
          }),
        });
        const data = await response.json();

        if (response.status === 200) {
          await AsyncStorage.setItem('userToken', data.token); 
          await AsyncStorage.setItem('sessionActive', 'true'); 
          navigation.navigate('MainApp');
        } else {
          Alert.alert('Login Failed', data.message || 'An error occurred during login');
        }
      } catch (error) {
        Alert.alert('Network Error', 'Unable to connect to the server. Please try again later.');
      }
    } else {
      Alert.alert('Invalid Credentials', 'Username and password cannot be empty.');
    }
  };
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <View style={styles.logoContainer}>
        {/* Add your logo here */}
        <Text style={styles.logoText}>TAXI CHAUFFOR</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaaaaa"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaaaaa"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      </View>
   
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f5',
  },
  logoContainer: {
    marginBottom: 60,
   
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2962ff',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    fontSize: 16,
    borderColor: '#dddddd',
    borderWidth: 1,
    color: '#333333',
  },
  buttonContainer: {
    backgroundColor: '#2962ff',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginPage;