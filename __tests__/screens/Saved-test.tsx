import React from 'react';
import {MockedProvider} from '@apollo/client/testing';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {fireEvent, render} from '@testing-library/react-native';
import {FavJokesContext} from '../../src/store/store';
import Saved from '../../src/screens/Saved';

const navigation: any = {
  setOptions: jest.fn(),
  navigate: jest.fn(),
};
const mocks: any[] = [];

const removeFavJoke = jest.fn();

describe('Saved', () => {
  test('renders correctly', () => {
    const component = (
      <MockedProvider mocks={mocks}>
        <FavJokesContext.Provider
          value={{
            addFavJoke: jest.fn(),
            removeFavJoke: jest.fn(),
            favJokes: [
              {
                id: '1',
                joke: 'TEST',
              },
            ],
          }}>
          <Saved />
        </FavJokesContext.Provider>
      </MockedProvider>
    );
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
  test('Click remove in card calls context removeJoke', async () => {
    const component = (
      <MockedProvider mocks={mocks}>
        <FavJokesContext.Provider
          value={{
            addFavJoke: jest.fn(),
            removeFavJoke,
            favJokes: [
              {
                id: '1',
                joke: 'Test',
              },
            ],
          }}>
          <Saved />
        </FavJokesContext.Provider>
      </MockedProvider>
    );
    const {getByTestId} = render(component);
    const toClick = await getByTestId('trash');
    fireEvent(toClick, 'press');
    expect(removeFavJoke).toHaveBeenCalled();
  });
});
