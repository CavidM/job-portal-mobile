import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RootSiblingParent } from 'react-native-root-siblings';
import { Provider } from 'react-redux';
import { NativeBaseProvider } from 'native-base';
import * as Sentry from 'sentry-expo';
import { ThemeProvider } from './src/core/theme/Theme';
import AppNavigator from './src/routes/App.navigator';
import useNavigationInitialState, { setNavigationState } from './src/hooks/NavigationState';
import { RegistrationProvider } from './src/context/Registration.context';
import { RegisterUserVerificationContextProvider } from './src/pages/registration-screens/register-user-verification/RegisterUserVerification.context';
import { GeneralInformationContextProvider } from './src/pages/registration-screens/register-user-with-generalinfo/GeneralInformation.context';
import { HTTP } from './src/core/http/HttpClient';
import { SpecialInformationContextProvider } from './src/pages/registration-screens/register-user-with-specialinfo/SpecialInformation.context';
import { installHttpMock } from './src/tools/mock-server/MockServer';
import store from './src/store/store';
import useCachedResources from './src/hooks/useCachedResources';
import { getEnvironment } from './src/core/config';
import { isReadyNavigationRef, navigationRef } from './src/tools/RootNavigation';
import { Lang } from './src/tools/LangTools';

Sentry.init({
  dsn: 'https://bae8aac87aaf4b27be41c1c7647c7a93@o990468.ingest.sentry.io/5948949',
  enableInExpoDevelopment: false,
  debug: true // Sentry will try to print out useful debugging information if something goes wrong with sending an event. Set this to `false` in production.
});

function App() {
  const isLoadingComplete = useCachedResources();
  const [isReady, initialState] = useNavigationInitialState();

  useEffect(() => () => {
    isReadyNavigationRef.current = false;
  }, []);

  if (!isReady) {
    return null;
  }

  if (__DEV__) {
    installHttpMock();
  }

  const { apiUrl } = getEnvironment();

  HTTP.createClient(apiUrl);

  Lang.setLang('az');

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  });

  if (isLoadingComplete) {
    return (
      <Provider store={store}>
        <ThemeProvider>
          <NativeBaseProvider>
            <QueryClientProvider client={queryClient}>
              <RootSiblingParent>
                <RegistrationProvider>
                  <RegisterUserVerificationContextProvider>
                    <GeneralInformationContextProvider>
                      <SpecialInformationContextProvider>
                        <NavigationContainer
                          ref={navigationRef}
                          initialState={initialState}
                          onStateChange={(state) => setNavigationState(state)}
                          onReady={() => {
                            isReadyNavigationRef.current = true;
                          }}
                        >
                          <AppNavigator />

                        </NavigationContainer>
                      </SpecialInformationContextProvider>
                    </GeneralInformationContextProvider>
                  </RegisterUserVerificationContextProvider>
                </RegistrationProvider>
              </RootSiblingParent>
            </QueryClientProvider>
          </NativeBaseProvider>
        </ThemeProvider>
      </Provider>
    );
  }

  return null;
}
// export { default } from './storybook';
export default App;
