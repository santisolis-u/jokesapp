import 'react-native';
import React from 'react';
import Button from '../../src/components/Button';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('Button', () => {
  it('renders correctly', () => {
    const json = renderer.create(<Button title={'TEST'} />).toJSON();
    expect(json).toMatchSnapshot();
  });
});
