import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';

interface ButtonProps {
  onPress?: () => void;
  title: string;
}

const Button: React.FC<ButtonProps> = ({title, onPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.pressable}>
      <Text style={styles.text}>{title}</Text>
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
