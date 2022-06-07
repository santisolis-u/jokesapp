import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';

interface ButtonProps {
  children: JSX.Element;
  style: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const Button: React.FC<ButtonProps> = ({children, style, onPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.pressable}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  pressable: {
    marginVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'black',
    width: '80%',
  },
  text: {
    fontFamily: 'OpenSans-Regular',
    color: 'white',
  },
});
