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
import { listUsersApi, deleteUsersApi } from '../../service/user_api';

const ManageUsers = ({ navigation }) => {
    const userData = useSelector((state) => state.userInfoList.info);
    const [userInfoLoading, setUserInfoLoading] = useState(true);
    const [userInfo, setUserInfo] = useState([]);

    const userInformation = async () => {
        try {
            const output = await listUsersApi(userData.accessToken);
            setUserInfo(output.data.output);
            setUserInfoLoading(false);
        } catch (err) {
            logout();
            navigation.replace('SignIn');
        }
    };
    const deleteUser = async (id) => {
        try {
            const query = await deleteUsersApi(id, userData.accessToken);
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
            setUserInfo(userInfo.filter(d => d.userUID !== id));
        } catch (err) {
            logout();
            navigation.replace('SignIn');
        }
    }

    useEffect(async () => {
        userInformation();
    }, []);

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <Text h4>Manage User</Text>
            {userInfoLoading ?
                <Skeleton height={500} />
                :
                <Datatable
                    type="user"
                    headData={['Fullname', 'Email', 'Role']}
                    bodyData={userInfo}
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

export default ManageUsers;
