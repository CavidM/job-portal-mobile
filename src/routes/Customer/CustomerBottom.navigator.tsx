/* eslint-disable prefer-const */
import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { useQueryClient } from 'react-query';
import { ThemeContextType, useTheme } from '../../core/theme/Theme';
import FeedIcon from '../../components/Icons/FeedIcon';
import { CustomerOrdersTabStackNavigator } from './CustomerOrdersTabStack.navigator';
import ProfileNavIcon from '../../components/Icons/ProfileNavIcon';
import { CustomerProfileStackNavigator } from './CustomerProfileTabStack.navigator';
import BagIcon from '../../components/Icons/BagIcon';
import normalize from '../../pages/common/styles/normalize';
import { CustomerAnnouncementStackNavigator } from './CustomerAnnouncementsTabStack.navigator';

const Tab = createBottomTabNavigator();

function CustomerBottomNavigatorRoutes() {
  const [bottonSize, setBottomSize] = useState(20);
  const queryClient = useQueryClient();
  const routesWithoutTabBar = ['ProfileEdit', 'PhoneNumberEdit', 'EditPhoneNumberVerificationOtp'];

  const getTabBarVisibility = (route) => {
    queryClient.invalidateQueries('getUser');
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';

    if (routesWithoutTabBar.includes(routeName)) {
      setBottomSize(0);
      return false;
    }
    setBottomSize(20);
    return true;
  };

  const { theme } = useTheme() as ThemeContextType;
  return (
    <View style={{ flex: 1, justifyContent: 'flex-start' }}>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: theme.palette.color.white,
          inactiveTintColor: theme.palette.color.white,
          style: {
            backgroundColor: theme.palette.color.primary,
            borderRadius: 16,
            height: 64,
            paddingBottom: 0,
            bottom: bottonSize,
            position: 'absolute',
            left: 20,
            right: 20,
            shadowColor: theme.palette.color.dark,
            elevation: 6,
            shadowOffset: {
              width: 0,
              height: 6
            },
            shadowOpacity: 0.2,
            shadowRadius: normalize(7.49)
          },
          showLabel: false,
          activeBackgroundColor: 'white',
          tabStyle: {
            borderRadius: 15
          }
        }}
        sceneContainerStyle={{ marginBottom: 80 }}
      >
        <Tab.Screen
          options={() => ({
            tabBarIcon: ({ focused }) => (
              <BagIcon
                svgProps={{
                  width: 24,
                  height: 24
                }}
                pathProps={{
                  stroke: focused ? theme.palette.color.primary : theme.palette.color.white,
                  fill: focused ? theme.palette.color.primary : theme.palette.color.white
                }}
              />
            )
          })}
          name="Home"
          component={CustomerAnnouncementStackNavigator}
        />
        <Tab.Screen
          options={() => ({
            tabBarIcon: ({ focused }) => (
              <FeedIcon
                pathProps={{
                  stroke: focused ? theme.palette.color.primary : theme.palette.color.white
                }}
              />
            )
          })}
          name="CustomerOrdersTab"
        >
          {CustomerOrdersTabStackNavigator}
        </Tab.Screen>
        <Tab.Screen
          options={({ route }) => ({
            tabBarVisible: getTabBarVisibility(route),
            tabBarIcon: ({ focused }) => (
              <ProfileNavIcon
                svgProps={{
                  width: 24,
                  height: 24,
                  viewBox: '0 0 18 18'
                }}
                pathProps={{
                  fill: focused ? theme.palette.color.primary : theme.palette.color.white
                }}
              />
            )
          })}
          name="Profile"
          component={CustomerProfileStackNavigator}
        />
      </Tab.Navigator>
    </View>

  );
}

export default CustomerBottomNavigatorRoutes;
