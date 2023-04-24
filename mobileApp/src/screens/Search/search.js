/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, TextInput, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Skeleton } from '@rneui/themed';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import Navbar from '../../components/Navbar';

import Toast from 'react-native-toast-message';
import { logout } from './../../auth/auth';
import { searchPlatesApi } from '../../service/plate_api';

const Search = ({ navigation }) => {
  const userData = useSelector((state) => state.userInfoList.info);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(true);
  const [vehicleResult, setVehicleResult] = useState();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSignInPressed = async (data) => {
    setSearchLoading(true);
    setLoading(true);
    try {
      const query = await searchPlatesApi(data, userData.accessToken);
      const successmessage = query.data.message;
      setVehicleResult(query.data.output);
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
    setSearchLoading(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView style={{ padding: 20 }}>
        <Navbar navigation={navigation} name="Search Plate No" />

        <Text style={{ fontSize: 18, fontFamily: 'Roboto-Medium', fontWeight: 'bold' }}>
          Please Enter Plate No to Verify if Registered
        </Text>

        <View style={styles.container}>
          <Text style={styles.label}>
            Plate No
          </Text>
          <CustomInput
            name="plateNo"
            rules={{ required: 'Plate No is required' }}
            placeholder="Enter Plate No"
            control={control}
          />
          <CustomButton
            text="Search Database"
            loading={{
              status: loading,
              color: '#fff',
              size: 'large',
            }}
            onPress={handleSubmit(onSignInPressed)}
          />
        </View>

        {searchLoading ?
          <Skeleton style={styles.skeleton} height={450} />
          :
          vehicleResult !== null ?
            <>
              <Text style={styles.comment}>Comment: This vehicle has been duly registered.</Text>
              <Text>Vehicle Plate No</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  value={vehicleResult.plateNo}
                  style={styles.input}
                  editable={false}
                  selectTextOnFocus={false}
                />
              </View>

              <Text>Vehicle Name</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  value={vehicleResult.vehicleinfos[0].vehicleName}
                  style={styles.input}
                  editable={false}
                  selectTextOnFocus={false}
                />
              </View>

              <Text>Vehicle Allocation Date</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  value={vehicleResult.vehicleinfos[0].vehicleAllocationDate}
                  style={styles.input}
                  editable={false}
                  selectTextOnFocus={false}
                />
              </View>

              <Text>Vehicle Expiration Date</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  value={vehicleResult.vehicleinfos[0].vehicleEpiringDate}
                  style={styles.input}
                  editable={false}
                  selectTextOnFocus={false}
                />
              </View>
            </>
            :
            <Text style={styles.comment}>Comment: This plate number has  not been duly registered, please report to FRSC.</Text>
        }
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
  },
  skeleton: {
    marginTop: '5%',
  },
  inputContainer: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  comment: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 20,
    fontFamily: 'Roboto-Medium',
    fontWeight: 'bold',
  },
  input: {
    color: 'black',
  },
});

export default Search;
