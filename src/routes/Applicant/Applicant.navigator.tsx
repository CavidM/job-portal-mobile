import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useQueryClient } from 'react-query';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  ApplicantScreenStackParamList, AppScreens
} from '../Navigator.types';
import { Labels } from '../../core/Langs';
import { ApplicantOrdersDetailsPage } from '../../pages/applicant-screens/service-order/ApplicantOrdersDetailsPage';
import normalize from '../../pages/common/styles/normalize';
import ArrowBackIcon from '../../components/Icons/ArrowBackIcon';
import { ThemeContextType, useTheme } from '../../core/theme/Theme';
import ApplicantBottomNavigatorRoutes from './ApplicantBottom.navigator';
import { GoToNotifications } from '../../pages/common/notifications/GoToNotifications';
import { ApplicantAnnouncementsDetailsPage } from '../../pages/applicant-screens/announcements/ApplicantAnnouncementDetailsPage';
import { ApplicantAnnouncementsFilterContainer } from '../../pages/applicant-screens/announcements/ApplicantAnnouncementsFilter.container';
import ApplicantQuestionnairePage from '../../pages/applicant-screens/service-order/ApplicantQuestionnaire.page';
import { NotificationsPage } from '../../pages/notifications/Notifications.page';
import { useUncompletedQuestionnaires } from '../../pages/questionnaire/authorization/useUncompletedQuestionnaires';
import { AnnouncementSpecificationsListPage } from '../../pages/applicant-screens/announcements/AnnouncementSpecificationsList.page';
import { SupportPage } from '../../pages/common/support/SupportPage';
import XIcon from '../../components/Icons/XIcon';
import { ApplicantColor } from '../../core/theme/Constants';
import NotificationIconHeader from '../../components/Icons/NotificationIconHeader';

const ApplicantStack = createStackNavigator<ApplicantScreenStackParamList>();

export const ApplicantNavigator = () => {
  const {
    theme,
    setPrimaryColor
  } = useTheme() as ThemeContextType;
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const colors = theme.palette.color;
  const { refreshUncompletedQuestionnaires } = useUncompletedQuestionnaires();

  useFocusEffect(() => {
    refreshUncompletedQuestionnaires();
  });

  useEffect(() => {
    setPrimaryColor(ApplicantColor);
  }, []);

  return (
    <View style={{
      flex: 1,
      justifyContent: 'flex-start'
    }}
    >
      <ApplicantStack.Navigator
        screenOptions={{ cardStyle: { backgroundColor: theme.palette.color.white } }}
      >
        <ApplicantStack.Screen
          name="ApplicantBottomNavigator"
          component={ApplicantBottomNavigatorRoutes}
          options={{ headerShown: false }}
        />
        <ApplicantStack.Screen
          name="ApplicantOrdersDetails"
          component={ApplicantOrdersDetailsPage}
          options={{
            cardStyle: { backgroundColor: theme.palette.color.checkboxBgColor },
            headerTitle: Labels.myOrders,
            headerTitleStyle: {
              color: theme.palette.color.white,
              textAlign: 'center',
              fontSize: 16,
              fontFamily: 'InterMedium'
            },
            headerStyle: { backgroundColor: theme.palette.color.primary },
            headerRight: () => (
              <GoToNotifications />
            ),
            headerBackImage: () => (
              <View style={{ paddingLeft: normalize(22) }}>
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
          name="ApplicantAnnouncementDetails"
          component={ApplicantAnnouncementsDetailsPage}
          options={{
            cardStyle: { backgroundColor: theme.palette.color.checkboxBgColor },
            headerTitle: Labels.myAnnouncements,
            headerTitleStyle: {
              color: theme.palette.color.white,
              textAlign: 'center',
              fontSize: 16,
              fontFamily: 'InterMedium'
            },
            headerStyle: { backgroundColor: theme.palette.color.primary },
            headerRight: () => (
              <GoToNotifications />
            ),
            headerBackImage: () => (
              <View style={{ paddingLeft: normalize(22) }}>
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
          name="AnnouncementSpecifications"
          component={AnnouncementSpecificationsListPage}
          options={{
            headerShown: false
          }}
        />
        <ApplicantStack.Screen
          name="ApplicantAnnouncementsFilter"
          component={ApplicantAnnouncementsFilterContainer}
          options={{
            headerTitle: 'Filter',
            headerTitleStyle: {
              color: theme.palette.color.white,
              textAlign: 'center',
              fontSize: 16,
              fontFamily: 'InterMedium'
            },
            headerStyle: { backgroundColor: theme.palette.color.primary },
            headerRight: () => (
              <GoToNotifications />
            ),
            headerLeft: () => (
              <TouchableOpacity onPress={() => {
                queryClient.fetchInfiniteQuery(['/user-announcements']);
                navigation.navigate(AppScreens.ApplicantAnnouncements);
              }}
              >
                <View style={{ paddingLeft: normalize(22) }}>
                  <ArrowBackIcon pathProps={{
                    fill: theme.palette.color.white
                  }}
                  />
                </View>
              </TouchableOpacity>
            ),
            headerBackTitleVisible: false
          }}
        />
        <ApplicantStack.Screen
          name="ApplicantNotifications"
          component={NotificationsPage}
          options={{
            headerTitle: 'Bildirişlər',
            headerTitleStyle: {
              color: colors.white,
              textAlign: 'center',
              fontSize: 16,
              fontFamily: 'InterMedium'
            },
            headerStyle: { backgroundColor: colors.primary },
            headerRight: () => (
              <View style={{ marginRight: 20, paddingRight: 3 }}>
                <NotificationIconHeader />
              </View>
            ),
            headerBackImage: () => (
              <View style={{ paddingLeft: normalize(22) }}>
                <ArrowBackIcon pathProps={{
                  fill: 'white'
                }}
                />
              </View>
            ),
            headerBackTitleVisible: false
          }}
        />

        <ApplicantStack.Screen
          name="ApplicantEvaluateOrder"
          component={ApplicantQuestionnairePage}
          options={{
            cardStyle: { backgroundColor: theme.palette.color.checkboxBgColor },
            headerShown: false,
            gestureEnabled: false
          }}
        />
        <ApplicantStack.Screen
          name="ApplicantSupportScreen"
          component={SupportPage}
          options={{
            cardStyle: { backgroundColor: theme.palette.color.checkboxBgColor },
            headerStyle: { backgroundColor: theme.palette.color.primary },
            headerRight: () => (
              <TouchableOpacity
                style={{ marginRight: 20, paddingRight: 3 }}
                onPress={() => navigation.navigate(AppScreens.ApplicantBottomNavigator)}
              >
                <XIcon pathProps={{
                  fill: 'white'
                }}
                />
              </TouchableOpacity>
            ),
            headerBackTitleVisible: false,
            headerTitle: '',
            headerBackImage: () => null
          }}
        />

      </ApplicantStack.Navigator>
    </View>
  );
};
