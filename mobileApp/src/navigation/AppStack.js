/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomDrawer from '../components/CustomDrawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import PlateScreen from '../screens/Plates';
import UserScreen from '../screens/Users';
import SearchScreen from '../screens/Search';

import TabNavigator from './TabNavigator';

import { useSelector } from 'react-redux';

const Drawer = createDrawerNavigator();

const AuthStack = () => {
  const userData = useSelector((state) => state.userInfoList.info);
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#3B71F3',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Search"
        component={SearchScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Feather name="search" color={color} size={22} />
          ),
        }}
      />
      <Drawer.Screen
        name="Plates"
        component={PlateScreen}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="car-info" size={22} color={color} />
          ),
        }}
      />
      {userData.role === 'ADMIN' ?
        <Drawer.Screen
          name="Users"
          component={UserScreen}
          options={{
            drawerIcon: ({ color }) => (
              <Feather name="users" size={22} color={color} />
            ),
          }}
        />
        : null}
    </Drawer.Navigator>
  );
};

export default AuthStack;
