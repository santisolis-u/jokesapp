import React from 'react';
import {Animated, StyleSheet, Dimensions, View} from 'react-native';

const {width} = Dimensions.get('window');

const Indicator = ({scrollX, itemsQty}: {scrollX: any; itemsQty: number}) => {
  return (
    <Animated.View style={styles.container}>
      {Array(itemsQty)
        .fill(1)
        .map((item, idx) => {
          const inputRange = [
            (idx - 1) * width,
            idx * width,
            (idx + 1) * width,
          ];
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.2, 1, 0.2],
            extrapolate: 'clamp',
          });
          return (
            <View key={idx} style={styles.stepContainer}>
              <Animated.View style={[styles.step, {opacity}]} />
            </View>
          );
        })}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  stepContainer: {
    maxWidth: width * 0.95,
  },
  step: {
    backgroundColor: 'black',
    height: 5,
    width: 50,
    borderRadius: 8,
    marginHorizontal: 8,
  },
});

export default Indicator;
