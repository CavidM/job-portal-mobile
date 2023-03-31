import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// import { enableScreens } from 'react-native-screens';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
import RegisterBeforeVerificationNavigator
  from './RegisterBeforeVerification.navigator';
import RegisterVerificationOtpPage
  from '../pages/registration-screens/register-verification-otp/RegisterVerificationOtp.page';
import { RootStackParamList } from './Navigator.types';
import { AsanRegisterContainer } from '../pages/asan-login/AsanRegister.container';
import { AsanLoginContainer } from '../pages/asan-login/AsanLogin.container';
import { EntryAuthContainer } from '../pages/entry-auth/EntryAuth.container';
import RegisterAfterVerificationNavigator from './RegisterAfterVerification.navigator';
// enableScreens();
import LoginVerificationOtpPage from '../pages/login-verification-otp/LoginVerificationOtp.page';
import { useAuthentication } from '../hooks/authentication/useAuthentication';
import { authenticationSelector, setLoader } from '../store/slices/authenticationSlice';
import { RootState } from '../store/store';
import useFontStyles from '../components/common/font.style';
import normalize from '../pages/common/styles/normalize';
import { NotificationListener, registerTaskForNotification } from '../core/push-notification/BackgroundTasks';
import { NotificationService } from '../services/notification-service/Notification.service';
import { flatNotificationList } from '../pages/notifications/Notifications.page';
import { saveNotificationsToRedux } from '../store/slices/notifications.slice';
import { HomeDrawerNavigation } from './drawer-navigation/HomeDrawerNavigation';
import { SpecialInformationProfessionsList } from '../pages/registration-screens/register-user-with-specialinfo/SpecialInformation.ProfessionsList';
import { GuestAnnouncementsPage } from '../pages/guest-screens/GuestsAnnouncements.page';
import { ThemeContextType, useTheme } from '../core/theme/Theme';
import { Labels } from '../core/Langs';
import ArrowBackIcon from '../components/Icons/ArrowBackIcon';
import { SpecialInformationSpecificationsList } from '../pages/registration-screens/register-user-with-specialinfo/SpecialInformationSpecificationsList';

const RootStack = createStackNavigator<RootStackParamList>();
const notificationService = NotificationService();

const AppNavigator = () => {
  // Get Authentication status from Authentication hook
  // Show splash screen if status is Loading
  const fontStyle = useFontStyles();
  const { bootstrapRestoreToken } = useAuthentication();
  const dispatch = useDispatch();
  // const notificationListener = NotificationListener();
  const userToken = useSelector(authenticationSelector.getUserToken);

  const { theme } = useTheme() as ThemeContextType;

  const {
    data, isLoading
  } = notificationService.useGetNotifications(Boolean(userToken));

  NotificationListener();

  const notificationList = flatNotificationList(data?.pages);
  const newNotifications = notificationList.filter((i) => i?.notificationState !== 'READ');
  useEffect(() => {
    if(userToken){
      dispatch(saveNotificationsToRedux(newNotifications));
    }
  }, [isLoading]);

  useEffect(() => {
    if (userToken) {
      registerTaskForNotification()
        .then(() => {
          console.log('push notification registered');
        });
    }
  }, [userToken]);

  useEffect(() => {
    dispatch(setLoader());
    bootstrapRestoreToken()
      .then((res) => console.log('token restored successfully: ', res))
      .catch((e) => console.log('could not restore token: ', e));
  }, []);

  const authState = useSelector((state: RootState) => state.authentication);
  setLoader();

  if (authState.isLoading) {
    return null;
  }

  const initialRoute = authState.userToken ? 'CustomerScreen' : undefined;

  return (
    <RootStack.Navigator
      // initialRouteName={initialRoute}
      screenOptions={{
        cardStyle: { backgroundColor: 'white' },
        headerTitle: '',
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 0,
          shadowOpacity: 0
        }
      }}
    >
      {
        (authState.userToken == null || !authState.registered) ?  (
          <>
            <RootStack.Screen
              name="GuestsAnnouncements"
              component={GuestAnnouncementsPage}
              options={{
                headerTitle: Labels.announcements,
                headerTitleStyle: {
                  color: theme.palette.color.white,
                  textAlign: 'center',
                  fontSize: 16,
                  fontFamily: 'InterMedium'
                },
                headerStyle: { backgroundColor: theme.palette.color.guestColor },
                cardStyle: { backgroundColor: theme.palette.color.checkboxBgColor }
              }}
            />
            <RootStack.Screen
              name="EntryAuth"
              component={EntryAuthContainer}
              options={{
                title: 'Sign in',
                animationTypeForReplace: authState.isSignOut ? 'pop' : 'push',
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
            />
            <RootStack.Screen
              name="AsanLogin"
              component={AsanRegisterContainer}
            // options={{
            //   title: 'Sign in',
            //   animationTypeForReplace: authState.isSignOut ? 'pop' : 'push'
            // }}
            />
            <RootStack.Screen
              name="AsanLogin1"
              component={AsanLoginContainer}
            // options={{
            //   title: 'Sign in',
            //   animationTypeForReplace: authState.isSignOut ? 'pop' : 'push'
            // }}
            />
            <RootStack.Screen
              name="RegisterProfessionsList"
              component={SpecialInformationProfessionsList}
              options={{
                headerShown: false
              }}
            />
            <RootStack.Screen
              name="RegisterSpecificationsList"
              component={SpecialInformationSpecificationsList}
              options={{
                headerShown: false
              }}
            />
            <RootStack.Screen
              name="RegisterVerificationOTP"
              component={RegisterVerificationOtpPage}
              options={{
                headerTitle: 'Təsdiqləmə',
                headerTitleStyle: [{ fontSize: normalize(17) }, fontStyle.fontFamilyInterRegular]
              }}
            />
            <RootStack.Screen
              name="LoginVerificationOTP"
              component={LoginVerificationOtpPage}
              options={{
                headerTitle: 'Təsdiqləmə',
                headerTitleStyle: [{ fontSize: normalize(17) }, fontStyle.fontFamilyInterRegular]
              }}
            />
            <RootStack.Screen
              name="RegisterBeforeVerification"
              component={RegisterBeforeVerificationNavigator}
              options={{ headerShown: false }}
            />
            <RootStack.Screen
                name="RegisterAfterVerification"
                component={RegisterAfterVerificationNavigator}
                options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <RootStack.Screen
              name="Home"
              component={HomeDrawerNavigation}
              options={{ headerShown: false }}
            />
          </>
        )
      }

    </RootStack.Navigator>
  );
};

export default AppNavigator;
