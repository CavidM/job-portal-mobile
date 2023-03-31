import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { NativeBaseProvider } from 'native-base';
import { ThemeProvider } from '../core/theme/Theme';
import { RegisterUserVerificationContextProvider } from '../pages/registration-screens/register-user-verification/RegisterUserVerification.context';
import {
  RegistrationProvider,
  UserTypes
} from '../context/Registration.context';
import { GeneralInformationContextProvider } from '../pages/registration-screens/register-user-with-generalinfo/GeneralInformation.context';
import { SpecialInformationContextProvider } from '../pages/registration-screens/register-user-with-specialinfo/SpecialInformation.context';
import store from '../store/store';

export const StoryBookProviders = ({ children }: any) => (
  <ThemeProvider>
    {children}
  </ThemeProvider>
);

interface AllProvidersProps {
  children: React.ReactNode
  userType?: UserTypes
}

export const AllProviders = ({ children, userType = undefined }: AllProvidersProps) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  });

  return (
    <Provider store={store}>
      <ThemeProvider>
        {/* @reference. https://github.com/th3rdwave/react-native-safe-area-context#testing */}
        <NativeBaseProvider initialWindowMetrics={{
          frame: {
            x: 0, y: 0, width: 0, height: 0
          },
          insets: {
            top: 0, left: 0, right: 0, bottom: 0
          }
        }}
        >
          <QueryClientProvider client={queryClient}>
            <RegistrationProvider defaultUserType={userType}>
              <RegisterUserVerificationContextProvider>
                <GeneralInformationContextProvider>
                  <SpecialInformationContextProvider>
                    {children}
                  </SpecialInformationContextProvider>
                </GeneralInformationContextProvider>
              </RegisterUserVerificationContextProvider>
            </RegistrationProvider>
          </QueryClientProvider>
        </NativeBaseProvider>
      </ThemeProvider>

    </Provider>
  );
};
