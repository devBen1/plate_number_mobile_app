/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import Navbar from '../../components/Navbar';
import Toast from 'react-native-toast-message';
import { logout } from './../../auth/auth';
import { updateAccountApi } from '../../service/user_api';

const Settings = ({ navigation }) => {
  const userData = useSelector((state) => state.userInfoList.info);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
  } = useForm({
    defaultValues: {
      username: userData.username,
      fullname: userData.userFullName,
      email: userData.userEmail,
    },
  });

  const onSignInPressed = async (data) => {
    setLoading(true);
    try {
      const query = await updateAccountApi(data, userData.accessToken);
      const successmessage = query.data.message;
      Toast.show({
        type: 'success',
        text1: 'Successfully',
        text2: successmessage,
      });
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView style={{ padding: 20 }}>
        <Navbar navigation={navigation} name="Settings" />

        <View style={styles.container}>
          <Text style={styles.label}>
            Username
          </Text>
          <CustomInput
            name="username"
            rules={{ required: 'Username is required' }}
            placeholder="Username"
            control={control}
          />
          <Text style={styles.label}>
            Fullname
          </Text>
          <CustomInput
            name="fullname"
            rules={{ required: 'Fullname is required' }}
            placeholder="Fullname"
            control={control}
          />
          <Text style={styles.label}>
            Email Address
          </Text>
          <CustomInput
            name="email"
            rules={{ required: 'Email is required' }}
            placeholder="Email Address"
            control={control}
          />
          <CustomButton
            text="Update"
            loading={{
              status: loading,
              color: '#fff',
              size: 'small',
            }}
            onPress={handleSubmit(onSignInPressed)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: '5%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: '5%',
  },
});

export default Settings;
