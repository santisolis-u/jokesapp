import React, {useEffect} from 'react';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import {Platform, StyleSheet} from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import {FavsProvider} from './src/store/Provider';
import {ApolloProvider} from '@apollo/client';
import {client} from './src/graphql/graphql';
import AppNavigator from './src/navigator/AppNavigator';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  useEffect(() => {
    messaging()
      .getToken(firebase.app().options.messagingSenderId)
      .then(x => console.log(x))
      .catch(e => console.log(e));
  }, []);
  useEffect(() => {
    firebase.messaging().onMessage(response => {
      console.log(JSON.stringify(response));
      if (Platform.OS !== 'ios') {
        showNotification(response.notification!);
        return;
      }
      PushNotificationIOS.requestPermissions().then(() =>
        showNotification(response.notification!),
      );
    });
  }, []);
  const showNotification = (
    notification: FirebaseMessagingTypes.Notification,
  ) => {
    PushNotification.localNotification({
      title: notification.title,
      message: notification.body!,
      channelId: '1',
    });
  };

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
