import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';

const LoadingOverlay = () => {
  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LoadingOverlay;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
