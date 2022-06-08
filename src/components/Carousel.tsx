import {
  Animated,
  Dimensions,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import Indicator from './Indicator';
import {Joke} from '../hooks/useJokes';

const {width} = Dimensions.get('window');

interface CarouselProps {
  items: Joke[];
  indexChange: (number: number) => void;
  fetchNextJokes: () => void;
  cardIndex: number;
  renderItem: any;
  display?: StyleProp<ViewStyle>;
}

const Carousel = ({
  items,
  indexChange,
  fetchNextJokes,
  cardIndex,
  renderItem,
  display,
}: CarouselProps) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  console.log('ITEMS:', items);
  return (
    <View style={[styles.container, display]}>
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
        renderItem={renderItem.bind(this, scrollX)}
        horizontal
        showsHorizontalScrollIndicator={false}
        onEndReached={() => {
          if (fetchNextJokes) {
            fetchNextJokes();
          }
        }}
      />
      <Indicator cardIndex={cardIndex} itemsQty={4} />
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
