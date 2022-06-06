import {
  ActivityIndicator,
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Title from '../components/Title';
import Card from '../components/Card';
import Button from '../components/Button';
import Carousel from '../components/Carousel';
import useJokes from '../hooks/useJokes';

const {width} = Dimensions.get('window');

const Home = () => {
  const {fourJokes, fetchMoreJokes, isLoading} = useJokes();
  const [page, setPage] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const indexChange = (index: number) => {
    setCardIndex(index);
  };

  return !isLoading ? (
    <View style={styles.root}>
      <Title
        style={styles.title}
        text={'Things you can say to annoy designers.'}
      />
      <View style={styles.carouselContainer}>
        <Carousel
          indexChange={indexChange}
          items={fourJokes}
          fetchNextJokes={fetchMoreJokes}
        />
      </View>
      <Button style={styles.saveButton}>
        <Text>Save</Text>
      </Button>
    </View>
  ) : (
    <View style={styles.root}>
      <ActivityIndicator size="large" color="#015da4" animating={true} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    // flex: 1,
  },
  carouselContainer: {
    flex: 5,
  },
  carousel: {
    flex: 1,
    backgroundColor: 'pink',
    width: '100%',
  },
  saveButton: {
    // flex: 1,
  },
});
