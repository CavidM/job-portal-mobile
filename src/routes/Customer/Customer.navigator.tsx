import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQueryClient } from 'react-query';
import ArrowBackIcon from '../../components/Icons/ArrowBackIcon';
import { AppScreens, CustomerScreenStackParamList } from '../Navigator.types';
import { ProfessionsListPage } from '../../pages/customer-screens/ProfessionsList.page';
import { SpecificationsListPage } from '../../pages/customer-screens/SpecificationsList.page';
import { UsersSearchFormContainer } from '../../pages/customer-screens/service-order/users-search-form/UsersSearchForm.container';
import { UsersSearchResultPage } from '../../pages/customer-screens/service-order/users-search-result/UsersSearchResult.page';
import { MapFullScreen } from '../../pages/customer-screens/service-order/map/MapFullScreen';
import { MapSearchPage } from '../../pages/customer-screens/service-order/map/MapSearchPage';
import CustomerBottomNavigatorRoutes from './CustomerBottom.navigator';
import { COLORS, CustomerColor } from '../../core/theme/Constants';
import normalize from '../../pages/common/styles/normalize';
import { Labels } from '../../core/Langs';
import { UsersSearchSchedulePage } from '../../pages/customer-screens/service-order/users-search-result/UsersSearchSchedule.page';
import { CustomerAnnouncementsDetailsPage } from '../../pages/customer-screens/announcements/CustomerAnnouncementDetailsPage';
import { ThemeContextType, useTheme } from '../../core/theme/Theme';
import { GoToNotifications } from '../../pages/common/notifications/GoToNotifications';
import { AnnouncementFormContainer } from '../../pages/customer-screens/announcements/AnnouncementForm.container';
import { CustomerAnnouncementsFilterContainer } from '../../pages/customer-screens/announcements/CustomerAnnouncementsFilter.container';
import CustomerQuestionnairePage from '../../pages/customer-screens/service-order/customerOrders/CustomerQuestionnaire.page';
import { NotificationsPage } from '../../pages/notifications/Notifications.page';
import { CustomerOrdersDetailsPage } from '../../pages/customer-screens/service-order/customerOrders/CustomerOrdersDetailsPage';
import XIcon from '../../components/Icons/XIcon';
import { SupportPage } from '../../pages/common/support/SupportPage';
import NotificationIconHeader from '../../components/Icons/NotificationIconHeader';

const CustomerStack = createStackNavigator<CustomerScreenStackParamList>();

export const CustomerNavigator = () => {
  const styles = StyleSheet.create({
    headerTitle: {
      fontSize: 15,
      fontFamily: 'InterMedium',
      color: COLORS.disabled
    }
  });
  const {
    theme,
    setPrimaryColor
  } = useTheme() as ThemeContextType;
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  useEffect(() => {
    setPrimaryColor(CustomerColor);
  }, []);

  return (
    <View style={{
      flex: 1,
      justifyContent: 'flex-start'
    }}
    >
      <CustomerStack.Navigator
        // initialRouteName="CustomerNotifications"
        screenOptions={{ cardStyle: { backgroundColor: COLORS.white } }}
      >
        <CustomerStack.Screen
          name="CustomerBottomNavigator"
          component={CustomerBottomNavigatorRoutes}
          options={{ headerShown: false }}
        />
        <CustomerStack.Screen
          name="ServiceOrderProfessions"
          component={ProfessionsListPage}
          options={{ headerShown: false }}
        />

        <CustomerStack.Screen
          name="ServiceOrderSpecifications"
          component={SpecificationsListPage}
          options={{ headerShown: false }}
        />
        <CustomerStack.Screen
          name="ServiceOrderJobDescription"
          component={UsersSearchFormContainer}
          options={{
            headerBackImage: () => (
              <View style={{ paddingLeft: normalize(22) }}><ArrowBackIcon /></View>
            ),
            headerTitle: Labels.createOrder,
            headerTitleStyle: styles.headerTitle,
            headerBackTitleVisible: false
          }}
        />
        <CustomerStack.Screen
          name="ServiceOrderUsersSearchResult"
          component={UsersSearchResultPage}
          options={{
            headerTitle: Labels.select,
            headerTitleStyle: styles.headerTitle,
            cardStyle: { backgroundColor: COLORS.cardBorderColor },
            headerBackImage: () => (
              <View style={{ paddingLeft: normalize(22) }}><ArrowBackIcon /></View>
            ),
            headerBackTitleVisible: false
          }}
        />
        <CustomerStack.Screen
          name="ServiceOrderUsersSearchSchedule"
          component={UsersSearchSchedulePage}
          options={{
            headerTitle: Labels.select,
            headerTitleStyle: styles.headerTitle,
            headerBackImage: () => (
              <View style={{ paddingLeft: normalize(22) }}><ArrowBackIcon /></View>
            ),
            headerBackTitleVisible: false
          }}
        />
        <CustomerStack.Screen
          name="ServiceOrderMapFullScreen"
          component={MapFullScreen}
          options={{ headerShown: false, headerTransparent: true }}
        />
        <CustomerStack.Screen
          name="ServiceOrderMapSearch"
          component={MapSearchPage}
          options={{
            headerTitleStyle: { display: 'none' },
            headerBackImage: () => (
              <View style={{ paddingLeft: normalize(22) }}><ArrowBackIcon /></View>
            ),
            headerBackTitleVisible: false
          }}
        />
        <CustomerStack.Screen
          name="CustomerOrdersDetails"
          component={CustomerOrdersDetailsPage}
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
        <CustomerStack.Screen
          name="CustomerAnnouncementDetails"
          component={CustomerAnnouncementsDetailsPage}
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
        <CustomerStack.Screen
          name="CustomerAnnouncementsFilter"
          component={CustomerAnnouncementsFilterContainer}
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
                queryClient.fetchInfiniteQuery(['/announcements']);
                navigation.navigate(AppScreens.CustomerAnnouncements);
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
        <CustomerStack.Screen
          name="CustomerAnnouncementForm"
          component={AnnouncementFormContainer}
          options={{
            headerBackImage: () => (
              <View style={{ paddingLeft: normalize(22) }}><ArrowBackIcon /></View>
            ),
            headerTitle: Labels.createAnnouncement,
            headerTitleStyle: styles.headerTitle,
            headerBackTitleVisible: false
          }}
        />
        <CustomerStack.Screen
          name="CustomerNotifications"
          component={NotificationsPage}
          options={{
            headerTitle: 'Bildirişlər',
            headerTitleStyle: {
              color: COLORS.white,
              textAlign: 'center',
              fontSize: 16,
              fontFamily: 'InterMedium'
            },
            headerStyle: { backgroundColor: COLORS.primary },
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
        <CustomerStack.Screen
          name="CustomerEvaluateOrder"
          component={CustomerQuestionnairePage}
          options={{
            cardStyle: { backgroundColor: theme.palette.color.checkboxBgColor },
            headerStyle: { backgroundColor: COLORS.primary },
            headerRight: () => (
              <TouchableOpacity
                style={{ marginRight: 20, paddingRight: 3 }}
                onPress={() => navigation.goBack()}
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
        <CustomerStack.Screen
          name="CustomerSupportScreen"
          component={SupportPage}
          options={{
            cardStyle: { backgroundColor: theme.palette.color.checkboxBgColor },
            headerStyle: { backgroundColor: COLORS.primary },
            headerRight: () => (
              <TouchableOpacity
                style={{ marginRight: 20, paddingRight: 3 }}
                onPress={() => navigation.navigate(AppScreens.CustomerBottomNavigator)}
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
      </CustomerStack.Navigator>
    </View>
  );
};
