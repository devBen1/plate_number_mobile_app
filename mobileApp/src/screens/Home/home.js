/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Skeleton } from '@rneui/themed';
import Navbar from '../../components/Navbar';
import Card from '../../components/Card';
import Datatable from '../../components/Datatable';
import { useSelector } from 'react-redux';
import { logout } from './../../auth/auth';
import Toast from 'react-native-toast-message';
import { countPlatesApi, listPlatesApi, deletePlatesApi } from '../../service/plate_api';


const HomeScreen = ({ navigation }) => {
  const userData = useSelector((state) => state.userInfoList.info);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [plateInfoLoading, setPlateInfoLoading] = useState(true);
  const [plateInfo, setPlateInfo] = useState([]);

  const countPlates = async () => {
    try {
      const output = await countPlatesApi(userData.accessToken);
      setCount(output.data.output);
      setLoading(false);
    } catch (err) {
      logout();
      navigation.replace('SignIn');
    }
  };

  const deletePlate = async (id) => {
    try {
      const query = await deletePlatesApi(id, userData.accessToken);
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
      setPlateInfo(plateInfo.filter(d => d.uniqueID !== id));
      setLoading(false);
    } catch (err) {
      logout();
      navigation.replace('SignIn');
    }
   }

  const platInformation = async () => {
    try {
      const output = await listPlatesApi(userData.accessToken);
      setPlateInfo(output.data.output);
      setPlateInfoLoading(false);
    } catch (err) {
      logout();
      navigation.replace('SignIn');
    }
  };

  useEffect(async () => {
    countPlates();
    platInformation();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView style={{ padding: 20 }}>
        <Navbar navigation={navigation} name={'Hello ' + userData.userFullName + '!'} />

        <View style={styles.row}>
          {loading ?
            <Skeleton height={100} />
            :
            <Card>
              <Text style={styles.text}>{count} {'\n'} Total Reg. Plates</Text>
            </Card>
          }
        </View>

        <View
          style={{
            marginVertical: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{ fontSize: 18, fontFamily: 'Roboto-Medium' }}>
            All Registered Plates
          </Text>
        </View>
        {plateInfoLoading ?
          <Skeleton height={500} />
          :
          <Datatable
            bodyData={plateInfo}
            // onPress={deletePlate}
          />
        }
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: {
    margin: 5,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Roboto-Medium',
  },
});

export default HomeScreen;
