import React from 'react';
import {Animated, StyleSheet, Text, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

interface JokeCardProps {
  text: string;
  backgroundColor: string;
}

const JokeCard = ({text, backgroundColor}: JokeCardProps) => {
  return (
    <Animated.View style={[styles.card, {backgroundColor}]}>
      <Text style={[styles.text]}>{text}</Text>
      <Text style={[styles.author]}>@designhumor</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 70,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 20,
    width: width * 0.8,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 24,
    marginHorizontal: 20,
    fontFamily: 'OpenSans-Bold',
  },
  author: {
    fontSize: 22,
    color: 'white',
    fontFamily: 'IndieFlower',
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorWithIcon: {
    marginRight: 8,
  },
});

export default JokeCard;
