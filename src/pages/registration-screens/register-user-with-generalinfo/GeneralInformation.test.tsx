import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { View } from 'react-native';
import React from 'react';
import { installHttpMock } from '../../../tools/mock-server/MockServer';
import { HTTP } from '../../../core/http/HttpClient';
import { GeneralInformationContainer } from './GeneralInformation.container';
import RegistrationStepsContainer from '../../common/registration-steps/RegistrationSteps.container';
import { AllProviders } from '../../../tools/Providers';
import { AppScreens } from '../../../routes/Navigator.types';
import { UserTypeApplicant, UserTypeCustomer } from '../../../context/Registration.context';

let mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate
  }),
  useRoute: () => ({}),
  getFocusedRouteNameFromRoute: () => 'GeneralInformation'
}));

installHttpMock({ environment: 'test' });
HTTP.createClient('http://api-dev.mol.eurodesign.az:8080/mol-api/v1');

beforeEach(() => {
  mockedNavigate = jest.fn();
});

describe('General information page', () => {
  // leave fields empty and submit the button
  // fields must show validation errors
  // the form can not submit
  it('should show validation errors', async () => {
    const {
      queryByText, getByA11yLabel
    } = render(
      <AllProviders userType={UserTypeApplicant}>
        <GeneralInformationContainer />
        <RegistrationStepsContainer />
      </AllProviders>
    );

    expect(getByA11yLabel('registration-next-step-button')).toBeTruthy();

    fireEvent.press(getByA11yLabel('registration-next-step-button'));

    await waitFor(() => {
      expect(queryByText('Adı daxil edin')).toBeTruthy();
    });
  });

  // set the user type to B (is axtaran)
  // fill the form
  // press submit button
  // the form should submit successfully
  // should navigate to special information page
  it('should submit form and navigate special information page When user type is B (is axtaran)', async () => {
    const {
      queryByText, getByA11yLabel, getByTestId
    } = render(
      <AllProviders userType={UserTypeApplicant}>
        <View>
          <GeneralInformationContainer />
          <RegistrationStepsContainer />
        </View>
      </AllProviders>
    );

    fireEvent.changeText(getByA11yLabel('text-input-Adı'), 'rocky');
    fireEvent.changeText(getByA11yLabel('text-input-Soyad'), 'balboa');
    fireEvent.changeText(getByA11yLabel('text-input-Ata adı'), 'kaso');
    fireEvent(getByTestId('select-picker-Cins'), 'onValueChange', 'MALE');
    fireEvent(getByTestId('select-picker-Şəhər'), 'onValueChange', 2);

    await waitFor(() => {
      expect(queryByText('Adı daxil edin')).toBeFalsy();
    });

    fireEvent.press(getByA11yLabel('registration-next-step-button'));

    expect(mockedNavigate).toHaveBeenCalledWith(AppScreens.SpecialInformation);
  });

  // set the user type to C (sifarisci)
  // fill the form
  // press submit button
  // the form should submit successfully
  // should navigate to upload photo page
  it('should submit form and navigate to upload photo page when user type is C (sifarisci)', async () => {
    const {
      queryByText, getByA11yLabel, getByTestId
    } = render(
      <AllProviders userType={UserTypeCustomer}>
        <View>
          <GeneralInformationContainer />
          <RegistrationStepsContainer />
        </View>
      </AllProviders>
    );

    fireEvent.changeText(getByA11yLabel('text-input-Adı'), 'rocky');
    fireEvent.changeText(getByA11yLabel('text-input-Soyad'), 'balboa');
    fireEvent.changeText(getByA11yLabel('text-input-Ata adı'), 'kaso');
    fireEvent(getByTestId('select-picker-Cins'), 'onValueChange', 'MALE');
    fireEvent(getByTestId('select-picker-Şəhər'), 'onValueChange', 2);

    await waitFor(() => {
      expect(queryByText('Adı daxil edin')).toBeFalsy();
    });

    fireEvent.press(getByA11yLabel('registration-next-step-button'));

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith(AppScreens.UploadPhoto);
    });
  });
});
