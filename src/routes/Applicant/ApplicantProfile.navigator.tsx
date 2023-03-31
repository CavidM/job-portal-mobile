import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import {
  ApplicantScreenStackParamList
} from '../Navigator.types';
import ArrowBackIcon from '../../components/Icons/ArrowBackIcon';
import normalize from '../../pages/common/styles/normalize';
import { COLORS } from '../../core/theme/Constants';
import { PersonalProfileContainer } from '../../pages/personal-profile/PersonalProfile.container';
// import ProfessionEdit from '../../pages/personal-profile/ProfessionEdit/ProfessionEdit.page';
import { ProfessionEditContainer } from '../../pages/personal-profile/profession-edit/ProfessionEdit.container';
import { ProfessionAddContainer } from '../../pages/personal-profile/profession-add/ProfessionAdd.container';
import { ProfileEditContainer } from '../../pages/personal-profile/profile-edit/ProfileEdit.container';
import { ThemeContextType, useTheme } from '../../core/theme/Theme';
import EditPhoneNumberVerificationOtpPafe
  from '../../pages/personal-profile/edit-phone-number-verification-otp/EditPhoneNumberVerification.page';

import { PhonenumbereditContainer }
  from '../../pages/personal-profile/phone-number-edit/PhoneNumberEdit.container';
import CancelIcon from '../../components/Icons/CancelIcon';
// import { } from '';

const ApplicantStack = createStackNavigator<ApplicantScreenStackParamList>();

export const ApplicantProfileStackNavigator = () => {
  const { theme } = useTheme() as ThemeContextType;
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: 'flex-start' }}>
      <ApplicantStack.Navigator
        screenOptions={{ cardStyle: { backgroundColor: theme.palette.color.white } }}
      >
        <ApplicantStack.Screen
          name="ApplicantProfile"
          component={PersonalProfileContainer}
          options={{
            headerShown: false,
            cardStyle: { backgroundColor: theme.palette.color.checkboxBgColor }
          }}
        />
        <ApplicantStack.Screen
          name="ProfessionEdit"
          component={ProfessionEditContainer}
          options={{
            headerTitle: 'Peşəni Redaktə Et',
            headerTitleStyle: {
              color: theme.palette.color.white,
              textAlign: 'center',
              fontSize: 16,
              fontFamily: 'InterMedium'
            },
            headerStyle: { backgroundColor: theme.palette.color.primary },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('ApplicantProfile')}>
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
        <ApplicantStack.Screen
          name="ProfessionAdd"
          component={ProfessionAddContainer}
          options={{
            headerTitle: 'Peşə Əlavə Et',
            headerTitleStyle: {
              color: theme.palette.color.white,
              textAlign: 'center',
              fontSize: 16,
              fontFamily: 'InterMedium'
            },
            headerStyle: { backgroundColor: theme.palette.color.primary },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('ApplicantProfile')}>
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
        <ApplicantStack.Screen
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
              <TouchableOpacity onPress={() => navigation.navigate('ApplicantProfile')}>
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
        <ApplicantStack.Screen
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
              <TouchableOpacity onPress={() => navigation.navigate('ApplicantProfile')}>
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
        <ApplicantStack.Screen
          name="EditPhoneNumberVerificationOtp"
          component={EditPhoneNumberVerificationOtpPafe}
          options={{
            headerTitle: 'Təsdiqləmə'
          }}
        />
      </ApplicantStack.Navigator>
    </View>
  );
};
