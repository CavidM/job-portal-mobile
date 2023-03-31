/* eslint-disable global-require */
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          Rubik: require('../assets/fonts/rubik/Rubik-Regular.ttf'),
          InterLight: require('../assets/fonts/inter/Inter-Light.ttf'),
          InterRegular: require('../assets/fonts/inter/Inter-Regular.ttf'),
          InterMedium: require('../assets/fonts/inter/Inter-Medium.ttf'),
          InterBold: require('../assets/fonts/inter/Inter-Bold.ttf'),
          InterSemiBold: require('../assets/fonts/inter/Inter-SemiBold.ttf'),
          InterExtraBold: require('../assets/fonts/inter/Inter-ExtraBold.ttf')
        });
      } catch (e) {
        throw new Error(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
