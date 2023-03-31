import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  View
} from 'react-native';

import RegistrationStepsContainer from '../pages/common/registration-steps/RegistrationSteps.container';
import { RegisterAfterVerificationStackParamList } from './Navigator.types';
import UploadPhotoPage from '../pages/registration-screens/register-user-with-photo/UploadPhoto.page';
import { GeneralInformationContainer } from '../pages/registration-screens/register-user-with-generalinfo/GeneralInformation.container';
import { SpecialInformationContainer } from '../pages/registration-screens/register-user-with-specialinfo/SpecialInformation.container';
import normalize from '../pages/common/styles/normalize';

const RegisterStack = createStackNavigator<RegisterAfterVerificationStackParamList>();

export default function RegisterAfterVerificationNavigator() {

  return (

    <View
      style={{ flex: 1 }}
    >
      <RegisterStack.Navigator screenOptions={{
        cardStyle: { backgroundColor: 'white' },
        headerTitle: '',
        headerStyle: {
          elevation: 0
        }
      }}
      >
      <RegisterStack.Screen name="GeneralInformation" component={GeneralInformationContainer} />
      <RegisterStack.Screen name="SpecialInformation" component={SpecialInformationContainer} />
      <RegisterStack.Screen name="UploadPhoto" component={UploadPhotoPage} />
      </RegisterStack.Navigator>
      <View style={{ alignItems: 'center', bottom: normalize(29) }}>
        <RegistrationStepsContainer initialRoute="GeneralInformation" />
      </View>

    </View>
  );
}
