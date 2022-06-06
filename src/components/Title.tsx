import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';

interface TitleProps {
  text: string;
  style?: StyleProp<ViewStyle>;
}

const Title: React.FC<TitleProps> = ({text, style}) => {
  return (
    <View style={[styles.titleContainer, style]}>
      <Text style={styles.title}>{text}</Text>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  titleContainer: {
    paddingTop: 42,
    paddingBottom: 42,
    paddingHorizontal: 46,
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
