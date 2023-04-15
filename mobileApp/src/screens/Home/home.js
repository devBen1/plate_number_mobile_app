/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Skeleton } from '@rneui/themed';
import Navbar from '../../components/Navbar';
import Card from '../../components/Card';
import Datatable from '../../components/Datatable';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView style={{padding: 20}}>
        <Navbar navigation={navigation} name="Hello John Doe!" />

        <View style={styles.row}>
          <Skeleton height={100} />
          <Card>
            <Text style={styles.text}>0 {'\n'} Total Reg. Plates</Text>
          </Card>
        </View>

        <View
          style={{
            marginVertical: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 18, fontFamily: 'Roboto-Medium'}}>
            All Registered Plates
          </Text>
        </View>
        <Datatable />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: {
    margin: 5,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Roboto-Medium',
  },
});

export default HomeScreen;
