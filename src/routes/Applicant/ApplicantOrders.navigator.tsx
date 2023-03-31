import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
import {
  ApplicantScreenStackParamList
} from '../Navigator.types';
import { Labels } from '../../core/Langs';
import { ApplicantOrdersContainer } from '../../pages/applicant-screens/service-order/ApplicantOrdersPage.container';
import { ThemeContextType, useTheme } from '../../core/theme/Theme';
import { GoToNotifications } from '../../pages/common/notifications/GoToNotifications';

const ApplicantStack = createStackNavigator<ApplicantScreenStackParamList>();

export const ApplicantOrderStackNavigator = () => {
  const { theme } = useTheme() as ThemeContextType;

  return (
    <View style={{ flex: 1, justifyContent: 'flex-start' }}>
      <ApplicantStack.Navigator
        screenOptions={{ cardStyle: { backgroundColor: theme.palette.color.white } }}
      >
        <ApplicantStack.Screen
          name="ApplicantOrders"
          component={ApplicantOrdersContainer}
          options={{
            headerTitle: Labels.myOrders,
            headerTitleStyle: {
              color: theme.palette.color.white,
              textAlign: 'center',
              fontSize: 16,
              fontFamily: 'InterMedium'
            },
            headerStyle: { backgroundColor: theme.palette.color.primary },
            headerLeft: () => (
              <View />
            ),
            headerRight: () => (
              <GoToNotifications />
            ),
            cardStyle: { backgroundColor: theme.palette.color.checkboxBgColor }
          }}
        />
      </ApplicantStack.Navigator>
    </View>
  );
};
