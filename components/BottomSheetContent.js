import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, PanResponder, TouchableOpacity, Button } from 'react-native';

const screenHeight = Dimensions.get('window').height
const BottomSheetHeight = 300; // Set a fixed height for the bottom sheet

const BottomSheetContent = () => {
  const translateY = useRef(new Animated.Value(screenHeight - BottomSheetHeight / 2)).current; // Start partially visible for testing
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    console.log('Effect hook ran - isExpanded:', isExpanded); // Confirm state change
    Animated.spring(translateY, {
      toValue: isExpanded ? screenHeight - BottomSheetHeight : screenHeight - BottomSheetHeight / 2, // Adjust for visibility
      useNativeDriver: true,
    }).start();
  }, [isExpanded]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        console.log('Gesture Move - dy:', gestureState.dy); // Log gesture movement
        translateY.setValue(gestureState.dy + (isExpanded ? 0 : screenHeight - BottomSheetHeight));
      },
      onPanResponderRelease: (_, gestureState) => {
        console.log('Gesture Release - dy:', gestureState.dy); // Log gesture release
        if (gestureState.dy < 100 && gestureState.vy < 0) {
          setIsExpanded(true); // Expand if upward swipe
        } else if (gestureState.dy > -100 && gestureState.vy > 0) {
          setIsExpanded(false); // Collapse if downward swipe
        } else {
          // Keep current state if the swipe was not clear
          const finalPosition = isExpanded ? screenHeight - BottomSheetHeight : screenHeight - BottomSheetHeight / 2;
          translateY.setValue(finalPosition);
        }
      },
    })
  ).current;

  return (
    <View style={{flex: 1}}> {/* Ensure this view covers the entire screen */}
      {/* Toggle Button for testing */}
      <Button title="Toggle Bottom Sheet" onPress={() => setIsExpanded(!isExpanded)} color="#841584" />

      {/* Bottom Sheet */}
      <Animated.View
        style={[
          styles.bottomSheet,
          { transform: [{ translateY }] },
        ]}
        {...panResponder.panHandlers}
      >
        <View style={styles.pullTab}>
          <Text style={{ color: 'white' }}>{isExpanded ? '⌄ Close' : '⌃ Open'}</Text>
        </View>
        {/* Bottom sheet content */}
        <Text style={{ color: 'black', marginTop: 20 }}>Swipe or Tap to {isExpanded ? 'Close' : 'Open'}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    position: 'absolute',
    width: '100%',
    height: BottomSheetHeight,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0, // Ensure bottom sheet is aligned to the bottom
  },
  pullTab: {
    position: 'absolute',
    top: -20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#841584',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomSheetContent;


// import React, { useMemo,useCallback, useRef } from 'react';
// import { View, Text, StyleSheet, Dimensions } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import BottomSheet from '@gorhom/bottom-sheet';

// const { width: screenWidth } = Dimensions.get('window');

// function BottomSheetContent() {
//   const BottomSheetRef = useRef(null);

//   const snapPoints = useMemo(() => ['10%', '100%'], []);

//   const handleSheetChanges = useCallback((index) => {
//     console.log('handleSheetChanges', index);
//   }, []);

//   return (
//     <>
//       <BottomSheet
//         ref={bottomSheetRef}
//         index={1}
//         snapPoints={snapPoints}
//         onChange={handleSheetChanges}
//       >
//         <View style={styles.contentContainer}>
//           {/* Content of the bottom sheet here */}
//           <View style={styles.column}>
//             <View style={styles.box}>
//               <Text>Dagens intäkter</Text>
//               <Text>0.00 kr</Text>
//             </View>
//             <View style={styles.box}>
//               <Text>Förarpoäng</Text>
//               <Text>100%</Text>
//             </View>
//           </View>
//           <View style={styles.row}>
//             <View style={styles.largeBox}>
//               <Text>Acceptansgrad</Text>
//               <Text>100%</Text>
//             </View>
//             <View style={styles.column}>
//               <View style={styles.smallBox}>
//                 <Text>Box 1</Text>
//               </View>
//               <View style={styles.smallBox}>
//                 <Text>Box 2</Text>
//               </View>
//             </View>
//           </View>
//         </View>
//       </BottomSheet>
//       {/* Arrow Icon or Button to toggle BottomSheet could go here */}
//     </>
//   );
// }


// const styles = StyleSheet.create({
//   contentContainer: {
//     flex: 1,
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   bottomSheet: {
//     height: 650,
//     backgroundColor: '#fff',
//     padding: 10,
   
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 5,
//   },
//   box: {
//     width: screenWidth - 15, 
//     height: 50,
//     backgroundColor: 'gray',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 5,
//   },
//   largeBox: {
//     width: screenWidth / 2 - 15,
//     height: 110,
//     backgroundColor: 'gray',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 5,
//   },
//   column: {
//     justifyContent: 'space-between',
//     height: 110, 
//   },
//   smallBox: {
//     width: screenWidth / 2 - 15,
//     height: 50, // 
//     backgroundColor: 'gray',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 10, 
//   },
//   // More styles for other components
// });

// export default BottomSheetContent;
