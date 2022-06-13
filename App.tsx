import {StyleSheet} from 'react-native';
import React from 'react';
import {ApolloProvider} from '@apollo/client';
import {client} from './src/graphql/graphql';
import {FavsProvider} from './src/store/Provider';
import AppNavigator from './src/navigator/AppNavigator';

const App = () => {
  return (
    <FavsProvider>
      <ApolloProvider client={client}>
        <AppNavigator />
      </ApolloProvider>
    </FavsProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
