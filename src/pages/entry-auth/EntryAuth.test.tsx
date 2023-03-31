import { render, fireEvent, waitFor } from '@testing-library/react-native';
import React from 'react';
import { EntryAuthContainer } from './EntryAuth.container';
import { AllProviders } from '../../tools/Providers';
import { AppScreens } from '../../routes/Navigator.types';
import { installHttpMock } from '../../tools/mock-server/MockServer';
import { HTTP } from '../../core/http/HttpClient';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate
  }),
  useRoute: () => ({}),
  getFocusedRouteNameFromRoute: () => 'EntryAuth'
}));

let server;
beforeAll(() => {
  server = installHttpMock({ environment: 'test' });
  HTTP.createClient('http://api-dev.mol.eurodesign.az:8080/mol-api/v1');
});

afterAll(() => {
  server.shutdown();
});

/* jest.mock('react-native-keyboard-aware-scroll-view', () => {
  const KeyboardAwareScrollView = ({ children }) => children;
  return { KeyboardAwareScrollView };
}); */

describe('Entry auth page', () => {
  it('should render entry auth page', () => {
    const { getByText, debug } = render(<EntryAuthContainer />, { wrapper: AllProviders });

    expect(getByText('Daxil ol')).toBeTruthy();
    expect(getByText('Qeydiyyatdan keç')).toBeTruthy();
  });

  it('should navigate to register user type page when click register button', () => {
    const { getByText } = render(<EntryAuthContainer />, { wrapper: AllProviders });

    fireEvent.press(getByText('Qeydiyyatdan keç'));

    expect(mockedNavigate).toHaveBeenCalledWith('RegisterBeforeVerification');
  });
});
it('should navigate to otp page when click login button', async () => {
  const {
    getByA11yLabel, queryByText, getByText, debug
  } = render(
    <EntryAuthContainer />,
    { wrapper: AllProviders }
  );
  // debug();
  fireEvent.changeText(getByA11yLabel('text-input-FIN kod'), '6hmhm0s');
  fireEvent(getByA11yLabel('text-input-Təvəllüd'), 'onChange', '09-02-202');
  await waitFor(() => {
    expect(queryByText('Adı daxil edin'))
      .toBeFalsy();
  });
  fireEvent.press(getByText('Daxil ol'));
  await waitFor(() => {
    expect(mockedNavigate).toHaveBeenCalledWith(AppScreens.LoginVerificationOTP);
  });
});
