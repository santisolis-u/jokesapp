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
}

const Button: React.FC<ButtonProps> = ({children, style}) => {
  return (
    <View style={[style, styles.buttonContainer]}>
      <Pressable style={styles.pressable}>
        <Text style={styles.text}>{children}</Text>
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'black',
    width: '80%',
  },
  pressable: {},
  text: {
    fontFamily: 'OpenSans-Regular',
    color: 'white',
  },
});
