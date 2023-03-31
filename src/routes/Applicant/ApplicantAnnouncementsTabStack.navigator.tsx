import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ApplicantScreenStackParamList, AppScreens } from '../Navigator.types';
import { Labels } from '../../core/Langs';
import { ThemeContextType, useTheme } from '../../core/theme/Theme';
import { GoToNotifications } from '../../pages/common/notifications/GoToNotifications';
import { FilterIcon } from '../../components/Icons/FilterIcon';
import { ApplicantAnnouncementsPage } from '../../pages/applicant-screens/announcements/ApplicantAnnouncementsPage';
import {FilteredApplicantAnnouncementsPage} from "../../pages/applicant-screens/announcements/FilteredApplicantAnnouncementsPage";

const ApplicantStack = createStackNavigator<ApplicantScreenStackParamList>();

export const ApplicantAnnouncementStackNavigator = () => {
  const { theme } = useTheme() as ThemeContextType;
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: 'flex-start' }}>
      <ApplicantStack.Navigator
        screenOptions={{ cardStyle: { backgroundColor: theme.palette.color.white } }}
      >
        <ApplicantStack.Screen
          name="ApplicantAnnouncements"
          component={ApplicantAnnouncementsPage}
          options={{
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
            headerLeft: () => (
              <TouchableOpacity
                style={{ paddingLeft: 25 }}
                onPress={() => navigation.navigate(AppScreens.ApplicantAnnouncementsFilter)}
              >
                <FilterIcon />
              </TouchableOpacity>
            ),
            cardStyle: { backgroundColor: theme.palette.color.checkboxBgColor }
          }}
        />
          <ApplicantStack.Screen
              name="FilteredApplicantAnnouncements"
              component={FilteredApplicantAnnouncementsPage}
              options={{
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
                  headerLeft: () => (
                      <TouchableOpacity
                          style={{ paddingLeft: 25 }}
                          onPress={() => navigation.navigate(AppScreens.ApplicantAnnouncementsFilter)}
                      >
                          <FilterIcon />
                      </TouchableOpacity>
                  ),
                  cardStyle: { backgroundColor: theme.palette.color.checkboxBgColor }
              }}
          />
      </ApplicantStack.Navigator>
    </View>
  );
};
