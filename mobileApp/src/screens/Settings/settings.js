/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Skeleton } from '@rneui/themed';
import { useForm } from 'react-hook-form';

import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import Navbar from '../../components/Navbar';

const Settings = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
  } = useForm({
    defaultValues: {
      username: 'test01',
      fullname: 'John Doe',
      email: 'john@example.com',
    },
  });

  const onSignInPressed = data => {
    setLoading(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView style={{ padding: 20 }}>
        <Navbar navigation={navigation} name="Settings" />

        <Skeleton height={100} />

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
