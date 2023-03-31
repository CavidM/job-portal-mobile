import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import {
  CustomerScreenStackParamList
} from '../Navigator.types';
import { PersonalProfileContainer } from '../../pages/personal-profile/PersonalProfile.container';
import { ThemeContextType, useTheme } from '../../core/theme/Theme';
import EditPhoneNumberVerificationOtpPafe from '../../pages/personal-profile/edit-phone-number-verification-otp/EditPhoneNumberVerification.page';
import normalize from '../../pages/common/styles/normalize';
import ArrowBackIcon from '../../components/Icons/ArrowBackIcon';
import { ProfileEditContainer } from '../../pages/personal-profile/profile-edit/ProfileEdit.container';
import { PhonenumbereditContainer } from '../../pages/personal-profile/phone-number-edit/PhoneNumberEdit.container';
import CancelIcon from '../../components/Icons/CancelIcon';
import { AddProfessionWithSwitchUserType } from '../../pages/customer-screens/AddProfessionWithSwitchUserType';

const CustomerStack = createStackNavigator<CustomerScreenStackParamList>();

export const CustomerProfileStackNavigator = () => {
  const { theme } = useTheme() as ThemeContextType;
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: 'flex-start' }}>
      <CustomerStack.Navigator
        screenOptions={{ cardStyle: { backgroundColor: theme.palette.color.white } }}
      >
        <CustomerStack.Screen
          name="CustomerProfile"
          component={PersonalProfileContainer}
          options={{
            headerShown: false,
            cardStyle: { backgroundColor: theme.palette.color.checkboxBgColor }
          }}
        />
        <CustomerStack.Screen
          name="ProfileEdit"
          component={ProfileEditContainer}
          options={{
            headerTitle: 'Profil',
            headerTitleStyle: {
              color: theme.palette.color.white,
              textAlign: 'center',
              fontSize: 16,
              fontFamily: 'InterMedium'
            },
            headerStyle: { backgroundColor: theme.palette.color.primary },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <View style={{ paddingRight: normalize(12) }}>
                  <CancelIcon pathProps={{ stroke: '#fff' }} />
                </View>
              </TouchableOpacity>
            ),
            headerBackImage: () => (
              <View style={{ paddingLeft: normalize(12) }}>
                <ArrowBackIcon pathProps={{
                  fill: theme.palette.color.white
                }}
                />
              </View>
            ),
            headerBackTitleVisible: false
          }}
        />
        <CustomerStack.Screen
          name="PhoneNumberEdit"
          component={PhonenumbereditContainer}
          options={{
            headerTitle: 'Profili Redaktə Et',
            headerTitleStyle: {
              color: theme.palette.color.white,
              textAlign: 'center',
              fontSize: 16,
              fontFamily: 'InterMedium'
            },
            headerStyle: { backgroundColor: theme.palette.color.primary },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <View style={{ paddingRight: normalize(12) }}>
                  <CancelIcon pathProps={{ stroke: '#fff' }} />
                </View>
              </TouchableOpacity>
            ),
            headerBackImage: () => (
              <View style={{ paddingLeft: normalize(12) }}>
                <ArrowBackIcon pathProps={{
                  fill: theme.palette.color.white
                }}
                />
              </View>
            ),
            headerBackTitleVisible: false
          }}
        />
        <CustomerStack.Screen
          name="EditPhoneNumberVerificationOtp"
          component={EditPhoneNumberVerificationOtpPafe}
          options={{
            headerTitle: 'Təsdiqləmə'
          }}
        />
        <CustomerStack.Screen
          name="AddProfessionWithSwitchUserType"
          component={AddProfessionWithSwitchUserType}
          options={{
            headerTitle: 'Peşə Əlavə Et'
          }}
        />
      </CustomerStack.Navigator>
    </View>
  );
};
