import React, {useEffect} from 'react';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import {Platform, StyleSheet} from 'react-native';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import {FavsProvider} from './src/store/Provider';
import {ApolloProvider} from '@apollo/client';
import {client} from './src/graphql/graphql';
import AppNavigator from './src/navigator/AppNavigator';
import messaging from '@react-native-firebase/messaging';
import useAuth from './src/hooks/useAuth';
import LoadingOverlay from './src/components/Loading';

const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
};

const App = () => {
  const {initializing} = useAuth();
  useEffect(() => {
    if (Platform.OS === 'android') {
      messaging()
        .getToken(firebase.app().options.messagingSenderId)
        .then(x => console.log(x))
        .catch(e => console.log(e));
    }
  }, []);

  const showNotification = (
    notification: FirebaseMessagingTypes.Notification,
  ) => {
    if (Platform.OS === 'android') {
      PushNotification.localNotification({
        title: notification.title,
        message: notification.body!,
        channelId: '1',
      });
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      firebase.messaging().onMessage(response => {
        console.log(JSON.stringify(response));
        showNotification(response.notification!);
        return;
      });
    }
  }, []);

  if (initializing) {
    return <LoadingOverlay />;
  }

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
