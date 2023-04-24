/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { Skeleton } from '@rneui/themed';
import {
    ScrollView,
    StyleSheet,
} from 'react-native';
import { Text } from '@rneui/themed';
import Datatable from '../../components/Datatable';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import { logout } from './../../auth/auth';
import { listPlatesApi, deletePlatesApi } from '../../service/plate_api';

const ManagePlates = ({ navigation }) => {
    const userData = useSelector((state) => state.userInfoList.info);
    const [plateInfoLoading, setPlateInfoLoading] = useState(true);
    const [plateInfo, setPlateInfo] = useState([]);

    const plateInformation = async () => {
        try {
            const output = await listPlatesApi(userData.accessToken);
            setPlateInfo(output.data.output);
            setPlateInfoLoading(false);
        } catch (err) {
            logout();
            navigation.replace('SignIn');
        }
    };
    const deletePlate = async (uniqueID) => {
        try {
            const query = await deletePlatesApi(uniqueID, userData.accessToken);
            if (query.statusCode === 403) {
                const failedMessage = query.output;
                failedMessage.map(i =>
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: i.msg,
                    }),
                );
            } else if (query.statusCode !== 200) {
                const errormessage = query.output;
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: errormessage,
                });
            } else {
                const successmessage = query.data.message;
                Toast.show({
                    type: 'success',
                    text1: 'Successfully',
                    text2: successmessage,
                });
            }
            setPlateInfo(plateInfo.filter(d => d.uniqueID !== uniqueID));
        } catch (err) {
            logout();
            navigation.replace('SignIn');
        }
    }

    useEffect(async () => {
        plateInformation();
    }, []);

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <Text h4>Manage Plate</Text>
            {plateInfoLoading ?
                <Skeleton height={500} />
                :
                <Datatable
                    bodyData={plateInfo}
                    // onPress={deletePlate}
                />
            }
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
