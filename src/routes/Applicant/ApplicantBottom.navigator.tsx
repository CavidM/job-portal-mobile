/* eslint-disable prefer-const */
import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch } from 'react-redux';
import { useQueryClient } from 'react-query';
import { ThemeContextType, useTheme } from '../../core/theme/Theme';
import ProfileNavIcon from '../../components/Icons/ProfileNavIcon';
import CenterView from '../../components/CenterView/CenterView';
import Loader from '../../components/Loader/Loader';
import { UserService } from '../../services/user-service/User.service';
import { ApplicantProfileStackNavigator } from './ApplicantProfile.navigator';
import { ApplicantOrderStackNavigator } from './ApplicantOrders.navigator';
import FeedIcon from '../../components/Icons/FeedIcon';
import BagIcon from '../../components/Icons/BagIcon';
import normalize from '../../pages/common/styles/normalize';
import { ApplicantAnnouncementStackNavigator } from './ApplicantAnnouncementsTabStack.navigator';
import { saveUserProfessionIdToRedux } from '../../store/slices/userInfo';

const Tab = createBottomTabNavigator();

function ApplicantBottomNavigatorRoutes() {
  const { theme } = useTheme() as ThemeContextType;

  const [buttonSize, setBottomSize] = useState(20);
  const [sceneMarginBottom, setSceneMarginBottom] = useState(80);

  const userService = UserService();
  const { isLoading, data: userData } = userService.useGetUser();
  const dispatch = useDispatch();

  useEffect(() => {
    const professionId = userData?.data?.data?.userProfessionsDTO.map((i) => i.professionDTO?.id);
    if (professionId) {
      dispatch(saveUserProfessionIdToRedux(professionId[0]));
    }
  }, [userData]);
  const queryClient = useQueryClient();

  const routesWithoutTabBar = ['ProfessionEdit', 'ProfessionAdd', 'ProfileEdit', 'PhoneNumberEdit', 'EditPhoneNumberVerificationOtp'];

  const getTabBarVisibility = (route: any) => {
    queryClient.invalidateQueries('getUser');
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';

    if (routesWithoutTabBar.includes(routeName)) {
      setBottomSize(0);
      setSceneMarginBottom(0);
      return false;
    }
    setBottomSize(20);
    setSceneMarginBottom(80);
    return true;
  };

  if (isLoading) {
    return <CenterView><Loader /></CenterView>;
  }

  return (

    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: theme.palette.color.white,
        inactiveTintColor: theme.palette.color.white,
        style: {
          backgroundColor: theme.palette.color.primary,
          borderRadius: 16,
          height: 64,
          paddingBottom: 0,
          bottom: buttonSize,
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
      sceneContainerStyle={{ marginBottom: sceneMarginBottom }}
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
        component={ApplicantAnnouncementStackNavigator}
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
        name="ApplicantOrdersTab"
        component={ApplicantOrderStackNavigator}
      />
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
        component={ApplicantProfileStackNavigator}
      />
    </Tab.Navigator>

  );
}

export default ApplicantBottomNavigatorRoutes;
