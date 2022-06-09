import {
  Animated,
  Dimensions,
  NativeScrollEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  ViewToken,
} from 'react-native';
import React, {useCallback, useRef} from 'react';
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
  const onViewableItemsChanged = React.useRef(
    ({changed}: {changed: ViewToken[]}) => {
      if (changed && changed.length > 0) {
        indexChange(changed[0].index || 0);
      }
    },
  );

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 90,
    waitForInteraction: true,
    minimumViewTime: 5,
  });

  return (
    <View style={[styles.container, display]}>
      <Animated.FlatList
        data={items}
        scrollEventThrottle={64}
        pagingEnabled
        onScroll={Animated.event(
          [
            {
              nativeEvent: {contentOffset: {x: scrollX}},
            },
          ],
          {
            useNativeDriver: false,
          },
        )}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current}
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
