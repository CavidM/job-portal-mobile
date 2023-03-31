import {
  act, fireEvent, render, waitFor
} from '@testing-library/react-native';
import React from 'react';
import { VerificationOtpContainer } from './VerificationOtp.container';
import { AllProviders } from '../../../tools/Providers';
import { installHttpMock } from '../../../tools/mock-server/MockServer';
import { HTTP } from '../../../core/http/HttpClient';
import { OtpContainerRenderProps } from './VerificationOtp.types';
import { OtpCheckActionRegister } from '../../../services/Otp.service';

const mockCallback = jest.fn();
const args: OtpContainerRenderProps = {
  callback: mockCallback,
  otpExpiryTime: 20,
  action: OtpCheckActionRegister
};

beforeAll(() => {
  installHttpMock({ environment: 'test' });
  HTTP.createClient('http://api-dev.mol.eurodesign.az:8080/mol-api/v1');
});

describe('Verification Otp', () => {
  it('should disable Submit button because of empty otp', () => {
    const { getByA11yLabel } = render(
      <VerificationOtpContainer {...args} />,
      { wrapper: AllProviders }
    );

    expect(getByA11yLabel('otp-submit-button')).toBeDisabled();
  });

  it('should disable "Yeniden gonder" button because otp has time', () => {
    const { getByA11yLabel } = render(
      <VerificationOtpContainer {...args} />,
      { wrapper: AllProviders }
    );

    expect(getByA11yLabel('resend-otp-button')).toBeDisabled();
  });

  it('should enable "Yeniden gonder" button, because otp time was expired', async () => {
    const { getByA11yLabel } = render(
      <VerificationOtpContainer {...args} otpExpiryTime={0} />,
      { wrapper: AllProviders }
    );

    await waitFor(() => {
      expect(getByA11yLabel('resend-otp-button')).toBeEnabled();
    });
  });

  it('should request new otp successfully when click "Yenidən göndərin" button', async () => {
    const { getByA11yLabel } = render(
      <VerificationOtpContainer {...args} otpExpiryTime={0} />,
      { wrapper: AllProviders }
    );

    await waitFor(() => {
      expect(getByA11yLabel('otp-input-3')).toBeDisabled();
    });

    fireEvent.press(getByA11yLabel('resend-otp-button'));

    await waitFor(() => {
      expect(getByA11yLabel('otp-input-3')).toBeEnabled();
    });
  });

  it('should successfully pass otp with correct otp code', async () => {
    const { getByA11yLabel, getByText } = render(
      <VerificationOtpContainer {...args} />,
      { wrapper: AllProviders }
    );

    const otp0 = getByA11yLabel('otp-input-0');
    const otp1 = getByA11yLabel('otp-input-1');
    const otp2 = getByA11yLabel('otp-input-2');
    const otp3 = getByA11yLabel('otp-input-3');

    fireEvent.changeText(otp0, '1');
    fireEvent.changeText(otp1, '1');
    fireEvent.changeText(otp2, '1');
    fireEvent.changeText(otp3, '1');

    expect(getByA11yLabel('otp-submit-button')).toBeEnabled();

    fireEvent.press(getByA11yLabel('otp-submit-button'));

    await waitFor(() => {
      expect(getByText('Uğurlu')).toBeTruthy();
      expect(mockCallback).toHaveBeenCalled();
    });
  });

  it('should show error when otp is not correct - (0000)', async () => {
    const { getByA11yLabel, getByText } = render(
      <VerificationOtpContainer {...args} />,
      { wrapper: AllProviders }
    );

    let otp0: any;
    let otp1: any;
    let otp2: any;
    let otp3: any;

    await waitFor(() => {
      otp0 = getByA11yLabel('otp-input-0');
      otp1 = getByA11yLabel('otp-input-1');
      otp2 = getByA11yLabel('otp-input-2');
      otp3 = getByA11yLabel('otp-input-3');
    });

    act(() => {
      fireEvent.changeText(otp0, '0');
      fireEvent.changeText(otp1, '0');
      fireEvent.changeText(otp2, '0');
      fireEvent.changeText(otp3, '0');
    });

    expect(getByA11yLabel('otp-submit-button')).toBeEnabled();

    fireEvent.press(getByA11yLabel('otp-submit-button'));

    await waitFor(() => {
      expect(getByText('Şifrə səhvdir')).toBeTruthy();
    });
  });
});
