import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  View
} from 'react-native';
import { useDispatch } from 'react-redux';
import RegisterUserVerificationPage
  from '../pages/registration-screens/register-user-verification/RegisterUserVerification.page';
import RegistrationStepsContainer from '../pages/common/registration-steps/RegistrationSteps.container';
import { RegisterBeforeVerificationStackParamList } from './Navigator.types';
import { RegisterUserTypeContainer } from '../pages/registration-screens/register-user-type/RegisterUserType.container';
import normalize from '../pages/common/styles/normalize';
import ArrowBackIcon from '../components/Icons/ArrowBackIcon';
import { ThemeContextType, useTheme } from '../core/theme/Theme';
import { setUnregistered } from '../store/slices/authenticationSlice';

const RegisterStack = createStackNavigator<RegisterBeforeVerificationStackParamList>();

export default function RegisterBeforeVerificationNavigator() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUnregistered());
  }, []);

  const { theme } = useTheme() as ThemeContextType;
  return (
    <View
      style={{ flex: 1 }}
    >
      <RegisterStack.Navigator screenOptions={{
        cardStyle: { backgroundColor: 'white' },
        headerTitle: '',
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 0,
          shadowOpacity: 0
        },
        headerBackImage: () => (
          <View style={{ paddingLeft: normalize(22) }}>
            <ArrowBackIcon pathProps={{
              fill: theme.palette.color.dark
            }}
            />
          </View>
        ),
        headerBackTitleVisible: false
      }}
      >
        <RegisterStack.Screen name="RegisterUserType" component={RegisterUserTypeContainer} />
        <RegisterStack.Screen name="RegisterUserVerification" component={RegisterUserVerificationPage} />
      </RegisterStack.Navigator>
      <View style={{ alignItems: 'center', bottom: normalize(29) }}>
        <RegistrationStepsContainer />
      </View>

    </View>
  );
}
