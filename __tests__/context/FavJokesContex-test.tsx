import React from 'react';
import {Pressable, Text} from 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {fireEvent, render} from '@testing-library/react-native';
import {FavsProvider} from '../../src/store/Provider';
import {FavJokesContext} from '../../src/store/store';

const mockedJoke = {
  id: '1',
  joke: 'test',
  permalink: '1',
};

describe('Fav Context', () => {
  test('Renders correctly', () => {
    const component = renderer.create(
      <FavsProvider>
        <FavJokesContext.Consumer>
          {value => (
            <>
              <Text>Loading:{value.favJokes.length}</Text>
            </>
          )}
        </FavJokesContext.Consumer>
      </FavsProvider>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
  test('Default state on savedJokes', () => {
    const {getByText} = render(
      <FavsProvider>
        <FavJokesContext.Consumer>
          {value => <Text>savedJokes: {value.favJokes.length}</Text>}
        </FavJokesContext.Consumer>
      </FavsProvider>,
    );
    expect(getByText('savedJokes: 0')).toBeTruthy();
  });
  test('function addFavJokes adds a joke to favorites', () => {
    const {getByTestId, getByText} = render(
      <FavsProvider>
        <FavJokesContext.Consumer>
          {value => (
            <>
              <Text>savedJokes: {value.favJokes.length}</Text>
              <Pressable
                onPress={value.addFavJoke?.bind(this, mockedJoke)}
                testID={'press-save'}>
                <Text>Press Save</Text>
              </Pressable>
            </>
          )}
        </FavJokesContext.Consumer>
      </FavsProvider>,
    );
    expect(getByText('savedJokes: 0')).toBeTruthy();
    fireEvent(getByTestId('press-save'), 'press');
    expect(getByText('savedJokes: 1')).toBeTruthy();
  });

  test('function removeFavJoke removes a joke to favorites', () => {
    const {getByText, getByTestId} = render(
      <FavsProvider>
        <FavJokesContext.Consumer>
          {value => (
            <>
              <Text>savedJokes: {value.favJokes.length}</Text>
              <Pressable
                onPress={value.addFavJoke?.bind(this, mockedJoke)}
                testID={'press-save'}>
                <Text>Press Save</Text>
              </Pressable>
              <Pressable
                onPress={value.removeFavJoke?.bind(this, '1')}
                testID={'press-delete'}>
                <Text>Press Delete</Text>
              </Pressable>
            </>
          )}
        </FavJokesContext.Consumer>
      </FavsProvider>,
    );
    expect(getByText('savedJokes: 0')).toBeTruthy();
    fireEvent(getByTestId('press-save'), 'press');
    expect(getByText('savedJokes: 1')).toBeTruthy();
    fireEvent(getByTestId('press-delete'), 'press');
    expect(getByText('savedJokes: 0')).toBeTruthy();
  });
  test('function addFavJokes doesnt add a joke to favorites if it has been already added', () => {
    const {getByTestId, getByText} = render(
      <FavsProvider>
        <FavJokesContext.Consumer>
          {value => (
            <>
              <Text>savedJokes: {value.favJokes.length}</Text>
              <Pressable
                onPress={value.addFavJoke?.bind(this, mockedJoke)}
                testID={'press-save'}>
                <Text>Press Save</Text>
              </Pressable>
            </>
          )}
        </FavJokesContext.Consumer>
      </FavsProvider>,
    );
    expect(getByText('savedJokes: 0')).toBeTruthy();
    fireEvent(getByTestId('press-save'), 'press');
    fireEvent(getByTestId('press-save'), 'press');
    expect(getByText('savedJokes: 1')).toBeTruthy();
  });
});
