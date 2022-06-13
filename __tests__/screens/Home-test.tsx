import React from 'react';
import Home from '../../src/screens/Home';
import {MockedProvider} from '@apollo/client/testing';
// Note: test renderer must be required after react-native.
import renderer, {act} from 'react-test-renderer';
import {FETCH_DAD_JOKE} from '../../src/graphql/graphql';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import {FavJokesContext} from '../../src/store/store';
import AppNavigator from '../../src/navigator/AppNavigator';
import Saved from '../../src/screens/Saved';

const navigation: any = {
  setOptions: jest.fn(),
  navigate: jest.fn(),
};

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

const jokesMocked: any[] = [
  {
    request: {
      query: FETCH_DAD_JOKE,
    },
    result: {
      data: {
        joke: {
          id: '1A',
          joke: 'TESTING JOKE',
          permalink: '404',
        },
      },
    },
  },
];

describe('<Home />', () => {
  test('renders correctly', () => {
    const component = (
      <MockedProvider mocks={jokesMocked}>
        <Home navigation={navigation} />
      </MockedProvider>
    );
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
  test('fires save joke when clicking save button', async () => {
    const mockAddFavJoke = jest.fn();
    const mockRemoveFavJoke = jest.fn();

    const component = (
      <FavJokesContext.Provider
        value={{
          favJokes: [],
          removeFavJoke: mockRemoveFavJoke,
          addFavJoke: mockAddFavJoke,
        }}>
        <MockedProvider mocks={jokesMocked}>
          <Home navigation={navigation} />
        </MockedProvider>
      </FavJokesContext.Provider>
    );
    const {getByText} = await render(component);
    const toClick = await getByText('Save');
    fireEvent.press(toClick);
    await waitFor(() => expect(mockAddFavJoke).toHaveBeenCalledTimes(1));
  });
});
