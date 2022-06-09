import React from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  Dimensions,
  View,
  ActivityIndicator,
} from 'react-native';
import {hexToRGB} from '../../utils/Colors';

const {width} = Dimensions.get('window');

interface JokeCardProps {
  text: string;
  backgroundColor: string;
  isLoading: boolean;
}

const JokeCard = ({text, backgroundColor, isLoading}: JokeCardProps) => {
  return (
    <Animated.View
      style={[
        styles.card,
        {
          backgroundColor: !isLoading
            ? backgroundColor
            : hexToRGB(backgroundColor, 0.7),
        },
      ]}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={'black'} />
        </View>
      )}
      <Text style={[styles.text, isLoading ? styles.isLoadingCard : null]}>
        {text}
      </Text>
      <Text style={[styles.author, isLoading ? styles.isLoadingCard : null]}>
        @designhumor
      </Text>
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
    marginHorizontal: width * 0.05,
    width: width * 0.8,
  },
  isLoadingCard: {
    opacity: 0.7,
  },
  loadingContainer: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    height: '100%',
    width: '100%',
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
