/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, SafeAreaView} from 'react-native';
import {Tab, TabView} from '@rneui/themed';
import Navbar from '../../components/Navbar';

import AddPlateScreen from '../../interface/Plates/add';
import ManagePlateScreen from '../../interface/Plates/manage';

const AddPlates = ({navigation}) => {
  const [index, setIndex] = React.useState(0);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{padding: 20}}>
        <Navbar navigation={navigation} name="Plates" />
      </View>

      <TabView
        value={index}
        onChange={setIndex}
        animationType="spring"
        style={{padding: 20}}>
        <TabView.Item style={{padding: 20, width: '100%' }}>
          <AddPlateScreen />
        </TabView.Item>
        <TabView.Item style={{padding: 20, width: '100%'}}>
          <ManagePlateScreen />
        </TabView.Item>
      </TabView>

      <Tab
        value={index}
        onChange={e => setIndex(e)}
        indicatorStyle={{
          backgroundColor: 'white',
          height: 3,
        }}
        variant="primary">
        <Tab.Item
          title="Add Plate"
          titleStyle={{fontSize: 12}}
          icon={{name: 'car-sport-outline', type: 'ionicon', color: 'white'}}
        />
        <Tab.Item
          title="Manage Plates"
          titleStyle={{fontSize: 12}}
          icon={{ name: 'construct-outline', type: 'ionicon', color: 'white'}}
        />
      </Tab>
    </SafeAreaView>
  );
};

export default AddPlates;
