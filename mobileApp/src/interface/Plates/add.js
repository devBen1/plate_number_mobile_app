/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, useWindowDimensions, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useForm } from 'react-hook-form';

import CustomInput from '../../components/CustomInput';
import SliderButton from '../../components/SliderButton';
import CongratulationsLogo from '../../../assets/images/congrats.png';
import GetStartedLogo from '../../../assets/images/get_started.png';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { logout } from './../../auth/auth';
import { addPlatesApi } from '../../service/plate_api';

const AddPlates = ({ navigation }) => {
  const userData = useSelector((state) => state.userInfoList.info);
  const [steps, setSteps] = useState(['Welcome', 'Vehicle', 'Owner', 'Finish']);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const { height } = useWindowDimensions();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitAction = async (data) => {
    setLoading(true);
    try {
      data.plateImage = 'plateImage';
      data.ownerImage = 'OwnerImage';
      const query = await addPlatesApi(data, userData.accessToken);
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

  const goNext = () => {
    if ((currentStep + 1) < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.centerAlignment}>
        <View style={styles.bodyStyle}>
          <View style={styles.centerAlignment}>
            <View style={styles.viewLine} />
          </View>
          <View style={styles.sliderBody}>
            {steps.map((label, i) =>
              <View key={i} style={[styles.centerAlignment, { width: 70 }]}>
                {i > currentStep && i !== currentStep && /* Not selected */
                  <View style={[styles.centerAlignment, styles.bgColorWhite, styles.menuSelection]}>
                    <Text style={{ fontSize: 15, color: '#3B71F3' }}>{i + 1}</Text>
                  </View>
                }
                {i < currentStep && /* Checked */
                  <View style={[styles.centerAlignment, styles.bgColorGreen, styles.menuSelection]}>
                    <Ionicons name="md-checkmark" size={20} color="#fff" />
                  </View>
                }
                {i === currentStep && /* Selected */
                  <View style={[styles.centerAlignment, styles.bgColorBlue, styles.menuSelection]}>
                    <Text style={{ fontSize: 13, color: '#ffffff' }}>{i + 1}</Text>
                  </View>
                }
                <Text style={{ fontSize: 12 }}>{label}</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#fff' }}>
        {currentStep === 0 &&
          <View style={styles.stepHeader}>
            <Text style={[styles.f18, { alignSelf: 'center' }]}>Get started</Text>
            <Text style={[styles.f14, { alignSelf: 'center' }]}>You are to provide information to register a user's car information and palate number. {'\n'}Kindly go through the information carefully to provide the required data.</Text>
            <Image
              source={GetStartedLogo}
              style={[styles.logo, { height: height * 0.3 }]}
              resizeMode="contain"
            />
          </View>
        }
        {currentStep === 1 &&
          <View style={styles.stepHeader}>
            <Text style={styles.f18}>Register vehicle information</Text>
            <Text style={styles.label}>Vehicle Plate No</Text>
            <CustomInput
              name="plateNo"
              rules={{ required: 'Plate No is required' }}
              placeholder="Enter Plate No"
              control={control}
            />
            <Text style={styles.label}>Vehicle Name</Text>
            <CustomInput
              name="vehicleName"
              rules={{ required: 'Vehicle Name is required' }}
              placeholder="Enter Vehicle Name"
              control={control}
            />
            <Text style={styles.label}>Vehicle Manufacturer</Text>
            <CustomInput
              name="vehicleManufacturer"
              rules={{ required: 'Vehicle Manufacturer is required' }}
              placeholder="Enter Vehicle Manufacturer"
              control={control}
            />
            <Text style={styles.label}>Vehicle Category</Text>
            <CustomInput
              name="vehicleCategory"
              rules={{ required: 'Vehicle Category is required' }}
              placeholder="Enter Vehicle Category"
              control={control}
            />
            <Text style={styles.label}>Vehicle Model No</Text>
            <CustomInput
              name="vehicleModelNo"
              rules={{ required: 'Vehicle Model No is required' }}
              placeholder="Enter Vehicle Model No"
              control={control}
            />
            <Text style={styles.label}>Vehicle Chassis No</Text>
            <CustomInput
              name="vehicleChassisNo"
              rules={{ required: 'Vehicle Chassis No is required' }}
              placeholder="Enter Vehicle Chassis No"
              control={control}
            />
            <Text style={styles.label}>Expiring Date</Text>
            <CustomInput
              name="vehicleEpiringDate"
              rules={{ required: 'Expiring Date is required' }}
              placeholder="Enter Expiring Date"
              control={control}
            />
            <Text style={styles.label}>Allocation Date</Text>
            <CustomInput
              name="vehicleAllocationDate"
              rules={{ required: 'Allocation Date is required' }}
              placeholder="Enter Allocation Date"
              control={control}
            />
            <Text style={styles.label}>Vehicle Make</Text>
            <CustomInput
              name="vehicleMake"
              rules={{ required: 'Vehicle Make is required' }}
              placeholder="Enter Vehicle Make"
              control={control}
            />
          </View>
        }
        {currentStep === 2 &&
          <View style={styles.stepHeader}>
            <Text style={styles.f18}>Register vehicle owner information</Text>
            <Text style={styles.label}>Vehicle Owner Name</Text>
            <CustomInput
              name="ownerName"
              rules={{ required: 'Vehicle Owner Name is required' }}
              placeholder="Enter Vehicle Owner Name"
              control={control}
            />
            <Text style={styles.label}>Owner Identification Type</Text>
            <CustomInput
              name="ownerID"
              rules={{ required: 'Owner Identification is required' }}
              placeholder="Enter Owner Identification"
              control={control}
            />
            <Text style={styles.label}>Owner Mobile No</Text>
            <CustomInput
              name="ownerMobileNo"
              rules={{ required: 'Owner Mobile No is required' }}
              placeholder="Enter Owner Mobile No"
              control={control}
            />
            <Text style={styles.label}>Owner Home Line</Text>
            <CustomInput
              name="ownerHomeLine"
              rules={{ required: 'Owner Home Line is required' }}
              placeholder="Enter Owner Home Line"
              control={control}
            />
            <Text style={styles.label}>Owner Email Address</Text>
            <CustomInput
              name="ownerEmail"
              rules={{ required: 'Owner Email Address is required' }}
              placeholder="Enter Owner Email Address"
              control={control}
            />
            <Text style={styles.label}>Owner Address</Text>
            <CustomInput
              name="ownerAddress"
              rules={{ required: 'Owner Address is required' }}
              placeholder="Enter Owner Address"
              control={control}
            />
            <Text style={styles.label}>City</Text>
            <CustomInput
              name="ownerCity"
              rules={{ required: 'City is required' }}
              placeholder="Enter City"
              control={control}
            />
            <Text style={styles.label}>Owner L.G.A</Text>
            <CustomInput
              name="ownerLGA"
              rules={{ required: 'Owner L.G.A is required' }}
              placeholder="Enter Owner L.G.A"
              control={control}
            />
          </View>
        }
        {currentStep === 3 &&
          <View style={styles.stepHeader}>
            <Text style={styles.f18}>Congratulations</Text>
            <Image
              source={CongratulationsLogo}
              style={[styles.logo, { height: height * 0.3 }]}
              resizeMode="contain"
            />
          </View>
        }
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {currentStep > 0 ?
            <SliderButton onPress={goBack}
              type="LEFT"
              text="Back"
            />
            : <Text> </Text>
          }
          {(currentStep + 1) < steps.length &&
            <SliderButton onPress={handleSubmit(goNext)}
              type="RIGHT"
              text="Next"
            />
          }
          {(currentStep + 1) === steps.length &&
            <SliderButton
              onPress={handleSubmit(onSubmitAction)}
              loading={{
                status: loading,
                color: '#fff',
                size: 'small',
              }}
              type="RIGHT"
              text="Finish"
            />
          }
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
  },
  bodyStyle: {
    width: 280,
    height: 70,
  },
  centerAlignment: {
    alignItems: 'center',
  },
  viewLine: {
    height: 2,
    backgroundColor: '#3B71F3',
    width: 180,
    position: 'absolute',
    top: 13,
    zIndex: 10,
  },
  sliderBody: {
    flexDirection: 'row',
    width: '100%',
    position: 'absolute',
    zIndex: 20,
  },
  bgColorWhite: {
    backgroundColor: '#fff',
    borderColor: '#3B71F3',
  },
  bgColorBlue: {
    backgroundColor: '#3B71F3',
    borderColor: '#3B71F3',
  },
  bgColorGreen: {
    backgroundColor: '#0faf9a',
    borderColor: '#0faf9a',
  },
  menuSelection: {
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderWidth: 2,
    borderRadius: 15,
    marginBottom: 10,
  },
  stepHeader: {
    height: '100%',
    paddingBottom: 20,
  },
  f18: {
    fontSize: 18,
    marginBottom: 15,
  },
  logo: {
    width: '70%',
    alignSelf: 'center',
    maxWidth: 300,
    maxHeight: 250,
    marginTop: '10%',
    marginBottom: 10,
  },
});

export default AddPlates;
