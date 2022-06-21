import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../screens/Home';
import Saved from '../screens/Saved';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignUp} from '../screens/SignUp';
import {Login} from '../screens/Login';
import useAuth from '../hooks/useAuth';
import Button from '../components/Button';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  Saved: undefined;
  SignUp: undefined;
  Login: undefined;
};

const AppNavigator = () => {
  const {user, signOut} = useAuth();
  return (
    <NavigationContainer>
      {!!user ? (
        <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
          <Stack.Screen
            options={{
              headerLeft: () => (
                <Pressable onPress={signOut}>
                  <Text style={styles.signOut}> {'<'} Sign Out</Text>
                </Pressable>
              ),
            }}
            name="Home"
            component={Home}
          />
          <Stack.Screen
            options={{title: 'Saved jokes'}}
            name="Saved"
            component={Saved}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  signOut: {
    fontFamily: 'OpenSans-Bold',
    color: 'red',
  },
});
