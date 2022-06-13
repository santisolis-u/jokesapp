import 'react-native';
import React from 'react';

import Card from '../../src/components/Card';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('Renders', () => {
  it('Renders correctly', () => {
    const json = renderer
      .create(<Card isLoading={false} text={'test'} backgroundColor={'red'} />)
      .toJSON();
    expect(json).toMatchSnapshot();
  });
  it('Renders correctly loading', () => {
    const json = renderer
      .create(
        <Card isLoading={true} text={'testing'} backgroundColor={'red'} />,
      )
      .toJSON();
    expect(json).toMatchSnapshot();
  });
});
