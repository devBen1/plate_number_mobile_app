/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
} from 'react-native';
import { Text } from '@rneui/themed';
import Datatable from '../../components/Datatable';

const ManagePlates = ({ navigation }) => {

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <Text h4>Manage Plate</Text>
            <Datatable />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: '0%',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: '5%',
    },
});

export default ManagePlates;
