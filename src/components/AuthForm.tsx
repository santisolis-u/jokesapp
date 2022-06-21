import React, {useState} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import useAuth from '../hooks/useAuth';
import Button from './Button';
import TextField from './TextField';

interface Props {
  isSignIn?: boolean;
  navigation: any;
}

const AuthForm = ({isSignIn = true, navigation}: Props) => {
  const {signIn, signUp} = useAuth();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const handlePasswordVisibleChange = () => {
    setPasswordVisible(lastPasswordVisible => !lastPasswordVisible);
  };
  const handleChange = (name: string, value: string) => {
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleSignIn = () => {
    signIn(form.email, form.password);
  };

  const handleSignUp = () => {
    signUp(form.email, form.password);
  };
  return (
    <View style={styles.container}>
      <TextField
        name={'email'}
        placeholder={'Email'}
        value={form.email}
        handleChange={handleChange}
      />
      <TextField
        secure={!passwordVisible}
        name={'password'}
        placeholder={'Password'}
        value={form.password}
        handleChange={handleChange}
      />
      <Button
        title={isSignIn ? 'Sign In' : 'Sign Up'}
        onPress={isSignIn ? handleSignIn : handleSignUp}
      />
      <View style={styles.already}>
        {isSignIn ? (
          <View>
            <Text style={styles.noLinkText}>Don't you have an account?</Text>
            <Pressable
              onPress={() => {
                navigation.navigate('SignUp');
              }}>
              <Text style={styles.linkText}>Please Sign Up</Text>
            </Pressable>
          </View>
        ) : (
          <View>
            <Text style={styles.noLinkText}>You already have an account?</Text>
            <Pressable
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <Text style={styles.linkText}>Please Log In</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

export default AuthForm;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  already: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  noLinkText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
  linkText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
