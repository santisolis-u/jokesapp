import 'react-native';
import React from 'react';

import Card from '../../src/components/Card';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Carousel from '../../src/components/Carousel';
import {fireEvent, render} from '@testing-library/react-native';

const indexChange = jest.fn();
const fetchNextJokes = jest.fn();
const items = [
  {
    id: '1',
    joke: 'Test',
    permalink: '1',
  },
];
describe('Renders', () => {
  it('Renders correctly', () => {
    const json = renderer
      .create(
        <Carousel
          items={items}
          indexChange={indexChange}
          fetchNextJokes={fetchNextJokes}
          cardIndex={0}
          renderItem={jest.fn()}
        />,
      )
      .toJSON();
    expect(json).toMatchSnapshot();
  });
  it('onFetchMore gets invoked when end reached', async () => {
    const {getByTestId} = render(
      <Carousel
        items={items}
        indexChange={indexChange}
        fetchNextJokes={fetchNextJokes}
        cardIndex={0}
        renderItem={jest.fn()}
      />,
    );
    const toScroll = await getByTestId('flatList');
    fireEvent.scroll(toScroll, {
      nativeEvent: {
        contentOffset: {
          y: 0,
          x: 500,
        },
        contentSize: {
          // Dimensions of the scrollable content
          height: 100,
          width: 500,
        },
        layoutMeasurement: {
          // Dimensions of the device
          height: 100,
          width: 100,
        },
      },
    });
    expect(fetchNextJokes).toHaveBeenCalledTimes(1);
  });
});
