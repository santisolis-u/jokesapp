import 'react-native';
import React from 'react';
import {hexToRGB} from '../../src/utils/Colors';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('Button', () => {
  it('converts rgba', () => {
    const blackToRGBA = hexToRGB('#000000', 0.5);
    expect(blackToRGBA).toBe('rgba(0, 0, 0, 0.5)');
  });
  it('converts rgb', () => {
    const blackToRGBA = hexToRGB('#000000');
    expect(blackToRGBA).toBe('rgb(0, 0, 0)');
  });
});
