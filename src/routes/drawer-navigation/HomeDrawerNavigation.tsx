import {
  DrawerContentScrollView,
  createDrawerNavigator
} from '@react-navigation/drawer';
import React from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import {
  Avatar, Box, HStack, Text, View
} from 'native-base';
import { useSelector } from 'react-redux';
import { useAuthentication } from '../../hooks/authentication/useAuthentication';
import {
  RegistrationContextType,
  useRegistration,
  UserTypeApplicant
} from '../../context/Registration.context';
import { ApplicantNavigator } from '../Applicant/Applicant.navigator';
import { CustomerNavigator } from '../Customer/Customer.navigator';
import { Lang } from '../../tools/LangTools';
import useFontStyles from '../../components/common/font.style';
import { useSwitchUserType } from '../../core/switch-user-type/useSwitchUserType';
import { AppScreens } from '../Navigator.types';
import { ThemeContextType, useTheme } from '../../core/theme/Theme';
import { userInfoSelectors } from '../../store/slices/userInfo';
import AvatarIcon from '../../components/Icons/AvatarIcon';
import { SupportIcon } from '../../components/Icons/SupportIcon';
import normalize from '../../pages/common/styles/normalize';
import { LogoutIcon } from '../../components/Icons/LogoutIcon';

export const HomeDrawerNavigation = () => {
  const { logOut } = useAuthentication();
  const navigation = useNavigation();
  const Drawer = createDrawerNavigator();
  const { userType } = useRegistration() as RegistrationContextType;
  const fontStyles = useFontStyles();
  const { theme } = useTheme() as ThemeContextType;
  const { color } = theme.palette;
  const { switchUserType } = useSwitchUserType();

  const changeUserTypeLabel = userType === UserTypeApplicant ? 'Sifarişçi ol' : 'İş axtaran ol';

  const requestAlertForSwitch = () => Alert.alert('İstifadəçi tipini dəyiş', 'İstifadəçi tipləri arasında istənilən zaman keçid edə bilərsiniz.', [
    {
      text: 'Ləğv et',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel'
    },
    {
      text: 'Dəyiş',
      onPress: () => switchUserType()
    }
  ]);
  const styles = StyleSheet.create({
    drawerItemContainer: {
      paddingVertical: 4,
      marginHorizontal: 10
    },
    drawerItem: {
      paddingHorizontal: 10,
      marginTop: 15,
      marginBottom: 12
    },
    drawerItemText: {
      ...fontStyles.fontFamilyInterMedium,
      fontSize: 14,
      marginRight: 10
    }
  });

  const userName = useSelector(userInfoSelectors.getUserName);
  const userPhoto = useSelector(userInfoSelectors.getUserPhoto);

  return (
    <Drawer.Navigator
      screenOptions={{ swipeEnabled: false }}
      drawerContent={(props) => (
        <>
          <Box style={{ backgroundColor: color.primary, height: normalize(130) }}>
            <HStack mt={6}>
              {userPhoto !== null
                ? (
                  <Avatar
                    marginRight={6}
                    mx={2.5}
                    marginY={4}
                    width={69}
                    height={69}
                    source={{
                      uri: userPhoto
                    }}
                  />
                )
                : (
                  <View
                    marginRight={6}
                    mx={2.5}
                    marginY={4}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <AvatarIcon
                      rectProps={{ fill: color.white }}
                    />
                  </View>
                )}

              <Text color={color.white} mt={10}>{userName}</Text>
            </HStack>
          </Box>

          <DrawerContentScrollView
            {...props}
            contentContainerStyle={{ paddingTop: 10 }}
            scrollEnabled={false}
          >
            <TouchableOpacity
              onPress={requestAlertForSwitch}
            >
              <View style={[styles.drawerItemContainer]}>
                <HStack style={styles.drawerItem}>
                  <Text style={styles.drawerItemText}>
                    {changeUserTypeLabel}
                  </Text>
                </HStack>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => (userType === UserTypeApplicant
                ? navigation.navigate(AppScreens.ApplicantSupportScreen)
                : navigation.navigate(AppScreens.CustomerSupportScreen))}
            >
              <View style={[styles.drawerItemContainer]}>
                <HStack alignItems="center" style={styles.drawerItem}>
                  <Text style={styles.drawerItemText}>
                    Dəstək
                  </Text>
                  <SupportIcon />
                </HStack>
              </View>

            </TouchableOpacity>

            <TouchableOpacity
              onPress={async () => {
                await logOut();
                navigation.navigate('GuestsAnnouncements');
              }}
            >
              <View style={[styles.drawerItemContainer]}>
                <HStack alignItems="center" style={styles.drawerItem}>
                  <Text style={styles.drawerItemText}>
                    {Lang.getLang('exit')}
                  </Text>
                  <LogoutIcon />
                </HStack>
              </View>
            </TouchableOpacity>
          </DrawerContentScrollView>
        </>

      )}
    >
      {
        userType === UserTypeApplicant
          ? (
            <Drawer.Screen
              name="ApplicantScreen"
              component={ApplicantNavigator}
              options={{ headerShown: false }}
            />
          )
          : (
            <Drawer.Screen
              name="CustomerScreen"
              component={CustomerNavigator}
              options={{ headerShown: false }}
            />
          )
      }
      <Drawer.Screen name="Home" component={() => null} />
    </Drawer.Navigator>
  );
};
