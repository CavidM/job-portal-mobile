import * as React from 'react';
import {
  TouchableOpacityProps,
  View
} from 'react-native';
import { useLayoutStyles } from '../styles/LayoutStyles';

interface NavBarProps extends TouchableOpacityProps {
  focused?: boolean,
  children? : React.ReactNode
}
const NavbarIcon: React.FC<NavBarProps> = (props) => {
  const { focused, children } = props;

  const styles = useLayoutStyles();
  return (
    <View
      style={focused ? styles.FocusedNavbarIcon : null}
    >
      <View>
        {children}
      </View>
    </View>
  );
};

export default NavbarIcon;
