import {Animated, Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Card from './Card';
import Indicator from './Indicator';
import {Joke} from '../hooks/useJokes';
import {JOKE_CARD_COLORS} from '../../utils/Colors';

const {width} = Dimensions.get('window');

interface CarouselProps {
  items: Joke[];
  indexChange: (number: number) => void;
  fetchNextJokes: () => void;
}

const Carousel = ({items, indexChange, fetchNextJokes}: CarouselProps) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={items}
        scrollEventThrottle={32}
        pagingEnabled
        onScroll={Animated.event(
          [
            {
              nativeEvent: {contentOffset: {x: scrollX}},
            },
          ],
          {
            useNativeDriver: false,
            listener: ({nativeEvent}) => {
              const index = Math.ceil(
                (nativeEvent as any).contentOffset.x / width,
              );
              if (indexChange) {
                indexChange(index);
              }
            },
          },
        )}
        keyExtractor={element => element.id}
        renderItem={item => (
          <Card
            backgroundColor={
              JOKE_CARD_COLORS[
                Math.floor(
                  Math.random() * (JOKE_CARD_COLORS.length - 1 + 1) + 0,
                )
              ]
            }
            text={item.item.joke}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        onEndReached={() => {
          if (fetchNextJokes) {
            fetchNextJokes();
          }
        }}
      />
      <Indicator itemsQty={items.length} scrollX={scrollX} />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: width * 0.05,
  },
});
