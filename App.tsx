import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import {ApolloProvider} from '@apollo/client';
import {client} from './src/graphql/graphql';
import {FavJokesContext} from './store/store';
import {Joke} from './src/hooks/useJokes';
import {FavsProvider} from './store/Provider';
import Saved from './src/screens/Saved';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  Saved: undefined;
};

const App = () => {
  return (
    <FavsProvider>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen
              options={{title: 'Saved❤️'}}
              name="Saved"
              component={Saved}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </FavsProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
