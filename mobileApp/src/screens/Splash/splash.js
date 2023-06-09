import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function FederalRoadSafety({ navigation }) {
    useEffect(() => {
        setTimeout(() => {
            handleGetToken();
        }, 2000);
    });

    const handleGetToken = async () => {
        const dataToken = await AsyncStorage.getItem('usertoken');
        if (!dataToken) {
            navigation.replace('Onboarding');
        } else {
            navigation.replace('Home');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Federal Road Safety Commission (FRSC)</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3B71F3',
    },
    text: {
        fontWeight: '800',
        fontSize: 30,
        color: 'white',
    },
});