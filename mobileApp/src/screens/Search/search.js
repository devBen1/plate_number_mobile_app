/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Skeleton } from '@rneui/themed';
import { useForm } from 'react-hook-form';

import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import Navbar from '../../components/Navbar';

const Search = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSignInPressed = data => {
    setLoading(true);
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

        <Skeleton style={styles.skeleton} height={450} />
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
});

export default Search;
