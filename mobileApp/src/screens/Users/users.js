/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { Tab, TabView } from '@rneui/themed';
import Navbar from '../../components/Navbar';

import AddUserscreen from '../../interface/Users/add';
import ManageUserscreen from '../../interface/Users/manage';

const AddUsers = ({ navigation }) => {
    const [index, setIndex] = React.useState(0);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ padding: 20 }}>
                <Navbar navigation={navigation} name="Users" />
            </View>

            <TabView
                value={index}
                onChange={setIndex}
                animationType="spring"
                style={{ padding: 20 }}>
                <TabView.Item style={{ padding: 20, width: '100%' }}>
                    <AddUserscreen />
                </TabView.Item>
                <TabView.Item style={{ padding: 20, width: '100%' }}>
                    <ManageUserscreen />
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
                    title="Add User"
                    titleStyle={{ fontSize: 12 }}
                    icon={{ name: 'user-plus', type: 'feather', color: 'white' }}
                />
                <Tab.Item
                    title="Manage Users"
                    titleStyle={{ fontSize: 12 }}
                    icon={{ name: 'users', type: 'feather', color: 'white' }}
                />
            </Tab>
        </SafeAreaView>
    );
};

export default AddUsers;
