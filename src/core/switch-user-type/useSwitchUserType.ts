import { useNavigation, DrawerActions } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { UserService } from '../../services/user-service/User.service';
import { AppScreens } from '../../routes/Navigator.types';
import { useAuthentication } from '../../hooks/authentication/useAuthentication';

export const useSwitchUserType = () => {
  const navigation = useNavigation() as DrawerNavigationProp<any>;
  const userService = UserService();
  const { mutateAsync } = userService.useSwitchUser;
  const { saveNewVerifiedToken } = useAuthentication();

  /**
   * Try to switch user type
   * In case of success call the function in order to save tokens and set the user type
   * In case of failure of missing profession navigate to add profession page, then repeat the process
   * In case of unknown failure close the drawer navigation and leave user unchanged.
   */
  const switchUserType = async () => {
    try {
      const res = await mutateAsync();
      await saveNewVerifiedToken(res?.data?.data);
    } catch (e) {
      if (e.response?.status === 409) {
        navigation.navigate(AppScreens.AddProfessionWithSwitchUserType);
      } else {
        // handle unknown error
      }
    }

    navigation.dispatch(DrawerActions.closeDrawer());
  };

  return {
    switchUserType
  };
};
