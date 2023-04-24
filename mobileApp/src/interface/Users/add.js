
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { Text } from '@rneui/themed';

import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { logout } from './../../auth/auth';
import { addUsersApi } from '../../service/user_api';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const AddUsers = ({ navigation }) => {
    const userData = useSelector((state) => state.userInfoList.info);
    const [loading, setLoading] = useState(false);

    const {
        control,
        handleSubmit,
        watch,
    } = useForm();

    const pswd = watch('new_password');

    const onSignInPressed = async (data) => {
        setLoading(true);
        try {
            const query = await addUsersApi(data, userData.accessToken);
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
        } catch (err) {
            if (!err?.response) {
                const errormessage = 'An error occurred';
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: errormessage,
                });
            } else if (err.response?.status === 401 || err.response?.status === 402) {
                logout();
                navigation.replace('SignIn');
            } else if (err.response?.status === 403) {
                const failedMessage = err.response.data.output;
                failedMessage.map(i =>
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: i.msg,
                    }),
                );
            } else {
                const errormessage = err.response.data.output;
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: errormessage,
                });
            }
        }
        setLoading(false);
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <Text h4>Add Users</Text>
            <Text style={styles.label}>Username</Text>
            <CustomInput
                name="username"
                rules={{
                    required: 'Username is required',
                    minLength: {
                        value: 3,
                        message: 'Username must be at least 3 characters long',
                    },
                    maxLength: {
                        value: 10,
                        message: 'Username must be at max of 10 characters long',
                    },

                }}
                placeholder="Username"
                control={control}
            />
            <Text style={styles.label}>Fullname</Text>
            <CustomInput
                name="userFullName"
                rules={{
                    required: 'Fullname is required',
                    minLength: {
                        value: 3,
                        message: 'Fullname must be at least 3 characters long',
                    },
                    maxLength: {
                        value: 50,
                        message: 'Fullname must be at max of 50 characters long',
                    },

                }}
                placeholder="Fullname"
                control={control}
            />
            <Text style={styles.label}>Email Address</Text>
            <CustomInput
                name="userEmail"
                rules={{
                    required: 'Email is required',
                    pattern: {
                        value: EMAIL_REGEX,
                        message: 'Email address is invalid',
                    },
                }}
                placeholder="Email Address"
                control={control}
            />
            <Text style={styles.label}>Password</Text>
            <CustomInput
                name="new_password"
                placeholder="Password"
                rules={{
                    required: 'Password is required',
                    minLength: {
                        value: 8,
                        message: 'Password should be at least 8 characters',
                    },
                }}
                control={control}
                secureTextEntry={true}
            />
            <Text style={styles.label}>Confirm Password</Text>
            <CustomInput
                name="confirm_password"
                placeholder="Confirm Password"
                rules={{
                    required: 'Confirm Password is required',
                    validate: value => value === pswd || 'Password does not match',
                }}
                control={control}
                secureTextEntry={true}
            />
            <CustomButton
                text="Add User"
                loading={{
                    status: loading,
                    color: '#fff',
                    size: 'large',
                }}
                onPress={handleSubmit(onSignInPressed)}
            />
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

export default AddUsers;
