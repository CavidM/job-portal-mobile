import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Box } from 'native-base';
import { AppScreens, CustomerScreenStackParamList } from '../Navigator.types';
import { Labels } from '../../core/Langs';
import { ThemeContextType, useTheme } from '../../core/theme/Theme';
import { CustomerAnnouncementsPage } from '../../pages/customer-screens/announcements/CustomerAnnouncementsPage';
import { GoToNotifications } from '../../pages/common/notifications/GoToNotifications';
import { FilterIcon } from '../../components/Icons/FilterIcon';
import PlusIcon from '../../components/Icons/PlusIcon';

const CustomerStack = createStackNavigator<CustomerScreenStackParamList>();

export const CustomerAnnouncementStackNavigator = () => {
  const { theme } = useTheme() as ThemeContextType;
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: 'flex-start' }}>
      <CustomerStack.Navigator
        screenOptions={{ cardStyle: { backgroundColor: theme.palette.color.white } }}
      >
        <CustomerStack.Screen
          name="CustomerAnnouncements"
          component={CustomerAnnouncementsPage}
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
                onPress={() => navigation.navigate(AppScreens.CustomerAnnouncementsFilter)}
              >
                <FilterIcon />
              </TouchableOpacity>
            ),
            cardStyle: { backgroundColor: theme.palette.color.checkboxBgColor }
          }}
        />
      </CustomerStack.Navigator>
      {/* Create Announcement Button */}
      <Box style={{ bottom: 10, position: 'absolute', right: 25 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate(AppScreens.ServiceOrderProfessions,
            { NextScreen: AppScreens.CustomerAnnouncementForm })}
          style={{
            width: 49,
            height: 49,
            borderRadius: 100 / 2,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <PlusIcon />
        </TouchableOpacity>
      </Box>
    </View>
  );
};
