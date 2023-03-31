import { render } from '@testing-library/react-native';
import React from 'react';
import { AllProviders, StoryBookProviders } from '../../../tools/Providers';
import {
  OtpVerificationDefault,
  OTPVerificationFillInput, OTPVerificationLoading,
  OTPVerificationResend, OTPVerificationSuccess, OTPVerificationWrongCode
} from './VerificationOtp.stories';

describe('Verification otp page stories', () => {
  it('should render OTP Verfication', () => {
    render(<OtpVerificationDefault />, { wrapper: AllProviders });
  });
  it('should render OTP Verfication resend', () => {
    render(<OTPVerificationResend />, { wrapper: AllProviders });
  });
  it('should render OTP Verfication fill input', () => {
    render(<OTPVerificationFillInput />, { wrapper: StoryBookProviders });
  });
  it('should render OTP Verification loading', () => {
    render(<OTPVerificationLoading />, { wrapper: StoryBookProviders });
  });
  it('should render OTP Verification success', () => {
    render(<OTPVerificationSuccess />, { wrapper: StoryBookProviders });
  });
  it('should render OTP Verification wrong code', () => {
    render(<OTPVerificationWrongCode />, { wrapper: StoryBookProviders });
  });
});
