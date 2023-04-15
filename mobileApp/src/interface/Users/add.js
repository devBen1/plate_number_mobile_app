
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { Text } from '@rneui/themed';

import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const AddUsers = ({ navigation }) => {
    const [loading, setLoading] = useState(false);

    const {
        control,
        handleSubmit,
        watch,
    } = useForm();

    const pswd = watch('password');

    const onSignInPressed = data => {
        setLoading(true);
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
                name="fullname"
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
                name="email"
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
                name="password"
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
