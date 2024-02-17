// components/BottomSheetContent.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function BottomSheetContent() {
  return (
    <View style={styles.bottomSheet}>
      {/* Your bottom sheet content goes here */}
      <Text>Bottom Sheet Content</Text>
       <Text>Bottom Sheet Content</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomSheet: {
    height: 600,
    backgroundColor: '#fff',
    // Add your styles here
  },
  // More styles for other components
});

export default BottomSheetContent;
