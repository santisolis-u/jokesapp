import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {render, fireEvent} from '@testing-library/react-native';
import {MockedProvider} from '@apollo/client/testing';
import AppNavigator from '../../src/navigator/AppNavigator';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock(
  'react-native-vector-icons/FontAwesome',
  () => 'MockedFontAwesomeIcon',
);

const mocks: any[] = [];

describe('Testing navigation', () => {
  test('Navigator displays Home by default', async () => {
    const component = (
      <MockedProvider mocks={mocks}>
        <AppNavigator />
      </MockedProvider>
    );
    const {findByText} = render(component);
    const title = await findByText('Things you can say to annoy designers.');
    expect(title).toBeTruthy();
  });

  test('Clicking on Saved button takes you to the Saved Screen', async () => {
    const component = (
      <MockedProvider mocks={mocks}>
        <AppNavigator />
      </MockedProvider>
    );
    const {getByText, findByText} = render(component);
    const toClick = await getByText(/Saved: 0/i);
    fireEvent(toClick, 'press');
    const newBody = await findByText('Nothing saved');
    expect(newBody).toBeTruthy();
  });
});
