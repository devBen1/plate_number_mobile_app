import React from 'react';
import Toast from 'react-native-toast-message';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import Navigation from './src/navigation/AuthStack';

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
        <NavigationContainer>
          <Navigation />
          <Toast />
        </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  },
});

export default App;
