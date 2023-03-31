import * as React from 'react';
import {
  View, TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLayoutStyles } from '../styles/LayoutStyles';
import { MenuIcon } from '../../../components/Icons/MenuIcon';
import { GoToNotifications } from '../notifications/GoToNotifications';
import normalize from '../styles/normalize';

const MainScreenHeaderBar = () => {
  const styles = useLayoutStyles();

  const navigation = useNavigation();

  return (
    <View style={styles.stickyHeaderStyle} testID="menu-header-wrapper" accessible>
      <View
        style={{
          paddingLeft: 20,
          marginTop: normalize(50),
          justifyContent: 'space-between',
          flexDirection: 'row'
        }}
        accessible
        testID="menu-header"
      >
        <TouchableOpacity
          accessible
          style={{
            padding: 7
          }}
          testID="drawer-open-button"
          accessibilityLabel="Drawer-open-button"
          onPress={async () => {
            navigation.openDrawer();
          }}
        >
          <MenuIcon />
        </TouchableOpacity>

        <GoToNotifications />
      </View>

    </View>
  );
};

export default MainScreenHeaderBar;
