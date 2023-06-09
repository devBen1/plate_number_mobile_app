/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { logout } from './../../auth/auth';

const CustomDrawer = props => {
  const navigation = useNavigation();
  const userData = useSelector((state) => state.userInfoList.info);

  const onLogout = () => {
    logout();
    navigation.replace('SignIn');
  };
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: '#3B71F3' }}>
        <ImageBackground
          source={require('../../../assets/images/bg.jpeg')}
          style={{ padding: 24, marginTop: -4 }}>
          <Image
            source={require('../../../assets/images/ng_logo.png')}
            style={{ height: 90, width: 90, borderRadius: 50, backgroundColor: '#fff', marginBottom: 10 }}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontFamily: 'Roboto-Medium',
              marginBottom: 5,
            }}>
            {userData.userFullName}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Roboto-Regular',
                marginRight: 5,
              }}>
              {userData.role}
            </Text>
            <FontAwesome5 name="superpowers" size={14} color="#fff" />
          </View>
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
        <TouchableOpacity onPress={() => { }} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="help-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Help
            </Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => { }} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="share-social-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Tell a Colleague
            </Text>
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => onLogout()} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
