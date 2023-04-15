/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Navbar = ({navigation,name}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
      }}>
      <Text style={{fontSize: 18, fontFamily: 'Roboto-Medium'}}>
        {name}
      </Text>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        {/* <ImageBackground
          source={require('../../../assets/images/ng_logo.png')}
          style={{width: 35, height: 35}}
          imageStyle={{borderRadius: 25}}
        /> */}
        <MaterialIcons name="format-align-left" size={22} />
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;
