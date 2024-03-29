import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

function BottomSheetContent() {
  return (
    <View style={styles.bottomSheet}>
      <View style={styles.column}>
        <View style={styles.box}>
          <Text>Dagens intäkter</Text>
          <Text>0.00 kr</Text>
        </View>
        <View style={styles.box}>
          <Text>Förarpoäng</Text>
          <Text>100%</Text>
        </View>
      </View>

       {/* Bottom three boxes  */}
      <View style={styles.row}>
        <View style={styles.largeBox}>
          <Text>Acceptansgrad</Text>
          <Text>100%</Text>
        </View>
        <View style={styles.column}>
          <View style={styles.smallBox}>
            <Text>Box 1</Text>
          </View>
          <View style={styles.smallBox}>
            <Text>Box 2</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomSheet: {
    height: 650,
    backgroundColor: '#fff',
    padding: 10,
   
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  box: {
    width: screenWidth - 15, 
    height: 50,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  largeBox: {
    width: screenWidth / 2 - 15,
    height: 110,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  column: {
    justifyContent: 'space-between',
    height: 110, 
  },
  smallBox: {
    width: screenWidth / 2 - 15,
    height: 50, // 
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10, 
  },
  // More styles for other components
});

export default BottomSheetContent;
