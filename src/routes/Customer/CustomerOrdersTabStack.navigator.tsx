import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Box } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import {
  AppScreens, CustomerScreenStackParamList
} from '../Navigator.types';
import PlusIcon from '../../components/Icons/PlusIcon';
import { CustomerOrdersContainer } from '../../pages/customer-screens/service-order/customerOrders/CustomerOrdersPage.container';
import { Labels } from '../../core/Langs';
import { COLORS } from '../../core/theme/Constants';
import normalize from '../../pages/common/styles/normalize';
import ArrowBackIcon from '../../components/Icons/ArrowBackIcon';
import { ThemeContextType, useTheme } from '../../core/theme/Theme';
import { GoToNotifications } from '../../pages/common/notifications/GoToNotifications';

const CustomerOrdersStack = createStackNavigator<CustomerScreenStackParamList>();

export const CustomerOrdersTabStackNavigator = () => {
  const navigation = useNavigation();
  const { theme } = useTheme() as ThemeContextType;

  return (
    <View style={{ flex: 1, justifyContent: 'flex-start' }}>
      <CustomerOrdersStack.Navigator
        screenOptions={{
          headerTitle: Labels.myOrders,
          headerTitleStyle: {
            color: COLORS.white,
            textAlign: 'center',
            fontSize: 16,
            fontFamily: 'InterMedium'
          },
          headerStyle: { backgroundColor: COLORS.primary },
          headerLeft: () => (
            <View />
          ),
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
      >
        <CustomerOrdersStack.Screen
          name="CustomerOrders"
          component={CustomerOrdersContainer}
        />
      </CustomerOrdersStack.Navigator>

      {/* Create Orders Button */}
      <Box style={{ bottom: 10, position: 'absolute', right: 25 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate(AppScreens.ServiceOrderProfessions,
            { NextScreen: AppScreens.ServiceOrderJobDescription })}
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
