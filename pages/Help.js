import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function HelpScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Help Screen</Text>
      <Text style={styles.text}>If you need help, please contact us at our email if is urgent fel free to call us:</Text>
      <Text style={styles.text}>Email: support@email.com</Text>
      <Text style={styles.text}>Phone Number: +4676670660</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Use flex to take up the whole screen
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    backgroundColor: '#f5f5f5', // Light grey background
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#2962ff', // Change the color to your app's theme color
  },
  text: {
    fontSize: 16,
    color: '#333', // Darker text for better readability
    marginBottom: 10, // Add some space between the text lines
  },
});

export default HelpScreen;
