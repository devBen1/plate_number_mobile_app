/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  useWindowDimensions,
  ScrollView,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import axios from '../../service/axios';
import Toast from 'react-native-toast-message';
// import AsyncStorage from '@react-native-async-storage/async-storage';


import Logo from '../../../assets/images/logo.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

const SignInScreen = () => {
  const [loading, setLoading] = useState(false);

  const {height} = useWindowDimensions();
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    // formState: {errors},
  } = useForm();

  const onSignInPressed = async data => {
    setLoading(true);
    try {
      const output = await axios.post('/auth/login', data, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        credentials: 'include',
      });
      const result = output.data.output.response;
      console.log(result);
      // await AsyncStorage.setItem('user', JSON.stringify(result));
      navigation.navigate('Home');
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        const errormessage = 'An error occurred';
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: errormessage,
        });
      } else if (err.response?.status === 400 || err.response?.status === 401) {
        const errormessage = err.response.data.output;
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: errormessage,
        });
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
        const errormessage = 'Failed login';
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
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        />
        <Text style={{fontWeight: 'bold', fontSize: 24, marginBottom: 15}}>
          Login to Account
        </Text>
        <CustomInput
          name="username"
          rules={{required: 'Username is required'}}
          placeholder="Username"
          control={control}
        />
        <CustomInput
          name="password"
          placeholder="Password"
          rules={{
            required: 'Password is required',
            minLength: {value: 3, message: 'Password is too short'},
          }}
          control={control}
          secureTextEntry={true}
        />
        <CustomButton
          text="Sign In"
          loading={{
            status: loading,
            color: '#fff',
            size: 'large',
          }}
          onPress={handleSubmit(onSignInPressed)}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 150,
    marginTop: '40%',
    marginBottom: 30,
  },
});

export default SignInScreen;
