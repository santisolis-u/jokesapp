import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import Button from '../components/Button';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigator/AppNavigator';
import Title from '../components/Title';
import AuthForm from '../components/AuthForm';

type SignUpProps = Partial<NativeStackScreenProps<RootStackParamList>>;

export const SignUp: React.FC<SignUpProps> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <AuthForm navigation={navigation} isSignIn={false} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    fontSize: 20,
    width: '90%',
    borderColor: '#9b9b9b',
    borderBottomWidth: 1,
    marginTop: 8,
    marginVertical: 15,
  },
});
