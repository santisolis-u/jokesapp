import React from 'react';
import {Animated, StyleSheet, Dimensions, View} from 'react-native';

const {width} = Dimensions.get('window');

const Indicator = ({
  itemsQty,
  cardIndex,
}: {
  itemsQty: number;
  cardIndex: number;
}) => {
  return (
    <Animated.View style={styles.container}>
      {Array(itemsQty)
        .fill(1)
        .map((item, idx) => {
          const opacity = cardIndex === idx ? 1 : 0.1;
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
