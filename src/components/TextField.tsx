import React, {useState} from 'react';
import {Dimensions, StyleSheet, TextInput, View} from 'react-native';

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    // paddingHorizontal: width * 0.03,
    borderColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 16,
  },
  input: {
    flex: 1,
    // paddingLeft: 16,
  },
});

interface Props {
  secure?: boolean;
  name: string;
  placeholder: string;
  value: any;
  handleChange: (name: string, value: string) => void;
}

const TextField = ({
  secure = false,
  name,
  placeholder,
  value,
  handleChange,
}: Props) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={'#535c68'}
        autoCorrect={false}
        secureTextEntry={secure}
        style={styles.input}
        value={value}
        onChangeText={handleChange.bind(this, name)}
      />
    </View>
  );
};

export default TextField;
