import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { View } from 'react-native';
import React from 'react';
import { AppScreens } from '../../../routes/Navigator.types';
import RegistrationStepsContainer from '../../common/registration-steps/RegistrationSteps.container';
import { AllProviders } from '../../../tools/Providers';
import { RegisterUserTypeContainer } from './RegisterUserType.container';
import { installHttpMock } from '../../../tools/mock-server/MockServer';
import { ApplicantColor, CustomerColor } from '../../../core/theme/Constants';

const mockedNavigate = jest.fn();
installHttpMock({ environment: 'test' });

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate
  }),
  useRoute: () => ({})
}));

describe('Register user type', () => {
  it('should disable "Next" button when user type not selected', () => {
    const {
      getByA11yLabel
    } = render(
      <View>
        <RegisterUserTypeContainer />
        <RegistrationStepsContainer />
      </View>, { wrapper: AllProviders }
    );

    expect(getByA11yLabel('registration-next-step-button')).toBeDisabled();
  });

  describe('should change the theme primary color correspond to user type', () => {
    it('should change the theme primary color to Applicant color (orange)', async () => {
      const {
        queryByText, getByA11yValue
      } = render(
        <View>
          <RegisterUserTypeContainer />
          <RegistrationStepsContainer />
        </View>, { wrapper: AllProviders }
      );

      const applicantButton = queryByText('İş axtaran');

      expect(applicantButton).toBeTruthy();
      expect(applicantButton).toBeEnabled();

      fireEvent.press(applicantButton);

      await waitFor(() => {
        expect(getByA11yValue({ text: `next-button-icon-${ApplicantColor}` })).toBeTruthy();
      });
    });

    it('should change the theme primary color to Customer color (blue)', async () => {
      const {
        queryByText, getByA11yValue
      } = render(
        <View>
          <RegisterUserTypeContainer />
          <RegistrationStepsContainer />
        </View>, { wrapper: AllProviders }
      );

      const applicantButton = queryByText('Sifarişçi');

      expect(applicantButton).toBeTruthy();
      expect(applicantButton).toBeEnabled();

      fireEvent.press(applicantButton);
      // debug()
      await waitFor(() => {
        expect(getByA11yValue({ text: `next-button-icon-${CustomerColor}` })).toBeTruthy();
      });
    });
  });

  it(`should navigate to ${AppScreens.RegisterUserVerification} page`, async () => {
    const {
      queryByText, getByA11yLabel
    } = render(
      <View>
        <RegisterUserTypeContainer />
        <RegistrationStepsContainer />
      </View>, { wrapper: AllProviders }
    );

    // here button is disable
    fireEvent.press(queryByText('Sifarişçi'));

    // here button is enabled
    fireEvent.press(getByA11yLabel('registration-next-step-button'));

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith(AppScreens.RegisterUserVerification);
    });
  });
});
