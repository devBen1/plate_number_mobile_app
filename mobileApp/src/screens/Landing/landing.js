/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NGLogo from './../../../assets/images/ng_logo.png';

const LandingScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.root}>
      <View style={{marginTop: 20}}>
        <Text style={styles.headerText}>
          Federal Road Safety Commision (FRSC)
        </Text>
      </View>
      <View style={styles.image}>
        <Image source={NGLogo} width={300} height={300} resizeMode="contain" />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.buttonText}>Let's Begin</Text>
        <MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerText: {
    fontFamily: 'Inter-Bold',
    fontWeight: 'bold',
    marginTop: 35,
    fontSize: 30,
    color: '#20315f',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#3B71F3',
    padding: 20,
    width: '90%',
    borderRadius: 10,
    marginBottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Roboto-MediumItalic',
  },
});

export default LandingScreen;
